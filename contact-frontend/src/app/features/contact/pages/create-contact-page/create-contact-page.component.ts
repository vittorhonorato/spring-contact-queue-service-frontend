import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContractFormComponent } from '../../components/contract-form/contract-form.component';
import { ContactRequest } from '../../models/contact-request.model';
import { ContactService } from '../../services/contact.service';

interface LandingCard {
  icon: string;
  title: string;
  description: string;
}

interface LandingStep {
  title: string;
  description: string;
}

@Component({
  selector: 'app-create-contact-page',
  templateUrl: './create-contact-page.component.html',
  styleUrls: ['./create-contact-page.component.scss']
})
export class CreateContactPageComponent {
  @ViewChild(ContractFormComponent)
  private contractFormComponent?: ContractFormComponent;
  @ViewChild('contactFormSection')
  private contactFormSection?: ElementRef<HTMLElement>;

  loading = false;
  readonly heroHighlights: string[] = [
    'Centralize solicitações em um único fluxo',
    'Acompanhe status e histórico com clareza',
    'Ganhe agilidade no atendimento interno'
  ];
  readonly heroMetrics: LandingCard[] = [
    {
      icon: 'support_agent',
      title: 'Atendimento mais ágil',
      description: 'Sua equipe responde solicitações com menos retrabalho e mais contexto.'
    },
    {
      icon: 'inventory_2',
      title: 'Organização por prioridade',
      description: 'As mensagens deixam de ficar dispersas em canais paralelos.'
    },
    {
      icon: 'visibility',
      title: 'Visibilidade total',
      description: 'Veja rapidamente o que entrou, o que está pendente e o que já foi tratado.'
    }
  ];
  readonly overviewCards: LandingCard[] = [
    {
      icon: 'hub',
      title: 'O que é o produto',
      description: 'Uma plataforma para registrar, gerenciar e acompanhar contatos recebidos em um fluxo único.'
    },
    {
      icon: 'troubleshoot',
      title: 'Qual problema resolve',
      description: 'Evita perda de solicitações, ruído de comunicação e falta de rastreabilidade no atendimento.'
    },
    {
      icon: 'groups',
      title: 'Para quem é útil',
      description: 'Times de operações, suporte, atendimento e áreas internas que recebem alto volume de demandas.'
    }
  ];
  readonly benefitCards: LandingCard[] = [
    {
      icon: 'security',
      title: 'Mais segurança',
      description: 'Dados centralizados e histórico consistente para auditoria e acompanhamento.'
    },
    {
      icon: 'bolt',
      title: 'Praticidade diária',
      description: 'Interface direta para cadastrar, buscar e consultar contatos sem complexidade.'
    },
    {
      icon: 'timer',
      title: 'Agilidade operacional',
      description: 'Menos tempo procurando informações e mais tempo resolvendo solicitações.'
    },
    {
      icon: 'thumb_up',
      title: 'Facilidade de uso',
      description: 'Fluxo intuitivo para usuários técnicos e não técnicos.'
    }
  ];
  readonly workflowSteps: LandingStep[] = [
    {
      title: 'Cadastro da solicitação',
      description: 'O usuário registra nome, e-mail, assunto e mensagem com validação automática.'
    },
    {
      title: 'Processamento e acompanhamento',
      description: 'A plataforma organiza os contatos e mantém o status disponível para consulta.'
    },
    {
      title: 'Consulta e rastreabilidade',
      description: 'O time visualiza rapidamente os contatos por listagem, ID ou e-mail.'
    }
  ];

  constructor(
    private readonly notificationService: NotificationService,
    private readonly contactService: ContactService,
    private readonly router: Router
  ) {}

  scrollToForm(): void {
    this.contactFormSection?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  submit(payload: ContactRequest): void {
    this.loading = true;

    this.contactService.postContact(payload).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (response) => {
        this.notificationService.success(
          'Contato enviado com sucesso. Para mais informaçoes, consulte o time de T.I atráves do seu chamado: ' + response.id
        );
        this.contractFormComponent?.resetForm();
        this.router.navigate(['/list-all']);
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.error('Erro ao enviar contato.: ' + err.message);
      }
    });
  }
}
