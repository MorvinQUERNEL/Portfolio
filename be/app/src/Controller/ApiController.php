<?php

namespace App\Controller;

use App\Entity\Messages;
use App\Entity\Sender;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api')]
class ApiController extends AbstractController
{
    #[Route('/status', name: 'api_status', methods: ['GET'])]
    public function status(): JsonResponse
    {
        return $this->json([
            'status' => 'ok',
            'message' => 'API is running',
            'timestamp' => date('c')
        ]);
    }

    #[Route('/me', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], 401);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles()
        ]);
    }

    #[Route('/contact', name: 'api_contact', methods: ['POST'])]
    public function contact(Request $request, EntityManagerInterface $em, ValidatorInterface $validator, MailerInterface $mailer): JsonResponse
    {
        try {
            // Récupération des données JSON du formulaire
            $data = json_decode($request->getContent(), true);
            
            if (!$data) {
                return $this->json(['error' => 'Données JSON invalides'], 400);
            }

            // Validation des champs requis
            if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
                return $this->json(['error' => 'Tous les champs sont requis'], 400);
            }

            // Validation de l'email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return $this->json(['error' => 'Email invalide'], 400);
            }

            // Vérifier si l'expéditeur existe déjà
            $senderRepository = $em->getRepository(Sender::class);
            $sender = $senderRepository->findOneBy(['email' => $data['email']]);

            if (!$sender) {
                // Créer un nouveau sender
                $sender = new Sender();
                $sender->setName($data['name']);
                $sender->setEmail($data['email']);
                
                // Valider l'entité Sender
                $errors = $validator->validate($sender);
                if (count($errors) > 0) {
                    return $this->json(['error' => 'Données invalides pour l\'expéditeur'], 400);
                }
                
                $em->persist($sender);
            } else {
                // Mettre à jour le nom si nécessaire
                if ($sender->getName() !== $data['name']) {
                    $sender->setName($data['name']);
                }
            }

            // Créer le message
            $message = new Messages();
            $message->setContent($data['message']);
            $message->setSender($sender);

            // Valider l'entité Message
            $errors = $validator->validate($message);
            if (count($errors) > 0) {
                return $this->json(['error' => 'Données invalides pour le message'], 400);
            }

            $em->persist($message);
            $em->flush();

            // Envoi de l'email de notification
            try {
                $email = (new Email())
                    ->from('noreply@portfolio.dev')
                    ->to('quernel.morvin@icloud.com')
                    ->subject('Nouveau message de contact - Portfolio')
                    ->html(
                        '<h2>Nouveau message de contact</h2>' .
                        '<p><strong>Nom :</strong> ' . htmlspecialchars($data['name']) . '</p>' .
                        '<p><strong>Email :</strong> ' . htmlspecialchars($data['email']) . '</p>' .
                        '<p><strong>Message :</strong></p>' .
                        '<div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">' .
                        nl2br(htmlspecialchars($data['message'])) .
                        '</div>' .
                        '<hr>' .
                        '<p><small>Message envoyé depuis le formulaire de contact du portfolio</small></p>'
                    );

                $mailer->send($email);
                
                return $this->json([
                    'success' => true,
                    'message' => 'Votre message a été envoyé avec succès',
                    'sender_id' => $sender->getId(),
                    'message_id' => $message->getId()
                ], 201);
                
            } catch (\Exception $emailError) {
                // Si l'email échoue, on garde quand même la sauvegarde en base
                return $this->json([
                    'success' => true,
                    'message' => 'Votre message a été enregistré (email non envoyé)',
                    'sender_id' => $sender->getId(),
                    'message_id' => $message->getId(),
                    'email_warning' => 'L\'email de notification n\'a pas pu être envoyé'
                ], 201);
            }

        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Une erreur est survenue lors de l\'envoi du message',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
