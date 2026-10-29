import type { Field, GlobalConfig } from 'payload'
import { revalidateHooks } from '@/lib/revalidate'

const rowLabel = { components: { RowLabel: '@/components/admin/ArrayRowLabel' } }

function half(...fields: Field[]): Field {
  return {
    type: 'row',
    fields: fields.map((f) => ({ ...f, admin: { ...('admin' in f ? f.admin : {}), width: '50%' } }) as Field),
  }
}

export const Landing: GlobalConfig = {
  slug: 'landing',
  label: 'Página inicial',
  admin: {
    group: 'Site',
    description: 'Todos os textos da página inicial, organizados por seção.',
  },
  hooks: revalidateHooks,
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Topo (hero)',
          fields: [
            {
              name: 'heroKicker',
              type: 'text',
              label: 'Chamada acima do título',
              defaultValue: 'Indie Rock · Laguna, SC',
            },
            {
              name: 'heroTagline',
              type: 'text',
              label: 'Frase de efeito',
              defaultValue: 'Psicodelia setentista, timbres analógicos e afetos em transformação.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagem de fundo',
            },
            half(
              { name: 'ctaPrimaryLabel', type: 'text', label: 'Botão 1 — texto', defaultValue: 'Ouça Mar de Mármara' } as Field,
              { name: 'ctaPrimaryUrl', type: 'text', label: 'Botão 1 — link' } as Field,
            ),
            half(
              { name: 'ctaSecondaryLabel', type: 'text', label: 'Botão 2 — texto', defaultValue: 'Assista o clipe de Souvenir' } as Field,
              { name: 'ctaSecondaryUrl', type: 'text', label: 'Botão 2 — link' } as Field,
            ),
          ],
        },
        {
          label: 'Sobre',
          fields: [
            half(
              { name: 'sobreEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Sobre' } as Field,
            ),
            {
              name: 'bioShort',
              type: 'textarea',
              label: 'Resumo (destaque)',
              defaultValue: 'Cinco artistas da cena independente catarinense, um som que atravessa o indie, o rock e a psicodelia setentista.',
            },
            {
              name: 'bioLong',
              type: 'textarea',
              label: 'Texto completo',
              admin: { description: 'Uma linha em branco separa os parágrafos.' },
              defaultValue:
                'Com um som que transita entre o indie e o rock, a Cereja Bloom nasceu do encontro entre cinco artistas vindos de diferentes projetos autorais da cena independente. Unindo suas referências e vivências musicais — que passam por bandas como Não É Mais Inverno, Rivokill, Simetria, Casebre e pelo trabalho solo da vocalista sob o nome Chovvve — a banda nasceu do encontro criativo desses artistas, que decidiram somar suas experiências e referências para explorar novas paisagens sonoras.\n\nDesde a formação, os integrantes vêm se encontrando quase todos os domingos ao longo de quase dois anos — não apenas para ensaiar, mas para construir uma identidade própria baseada na colaboração, na experimentação e no amor pela música. Com uma pegada vintage, somado ao uso de um órgão e timbres analógicos, o resultado é um repertório autoral com referências setentistas, que mistura a sensibilidade do indie com a psicodelia, o rock e outros gêneros contemporâneos que atravessam a essência do grupo. Já as letras falam sobre afetos, ciclos e transformações, fazendo com que a Cereja Bloom apresente músicas que são, ao mesmo tempo, introspectivas e expansivas.\n\nRecentemente a banda lançou seu primeiro single e clipe intitulado "Desaforo", que está na lista dos melhores do ano pela renomada curadoria catarinense Rifferama. A Cereja Bloom está focada em divulgar seu trabalho autoral com apresentações ao vivo e na produção do seu primeiro EP.',
            },
            {
              name: 'bioMeta',
              type: 'array',
              label: 'Dados rápidos',
              labels: { singular: 'Item', plural: 'Itens' },
              admin: rowLabel,
              defaultValue: [
                { label: 'Gênero', value: 'Indie Rock' },
                { label: 'Cidade', value: 'Laguna, SC' },
                { label: 'Formação', value: '5 integrantes' },
              ],
              fields: [
                { name: 'label', type: 'text', label: 'Rótulo', required: true },
                { name: 'value', type: 'text', label: 'Valor', required: true },
              ],
            },
          ],
        },
        {
          label: 'Integrantes',
          description: 'A lista de integrantes fica em Conteúdo > Integrantes.',
          fields: [
            half(
              { name: 'integrantesEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Banda' } as Field,
              { name: 'integrantesTitle', type: 'text', label: 'Título', defaultValue: 'Quem faz parte da banda' } as Field,
            ),
          ],
        },
        {
          label: 'Músicas',
          description: 'Os singles listados ao lado do player ficam em Conteúdo > Músicas.',
          fields: [
            half(
              { name: 'musicasEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Músicas' } as Field,
              { name: 'musicasTitle', type: 'text', label: 'Título', defaultValue: 'Ouça a Cereja Bloom' } as Field,
            ),
            {
              name: 'spotifyEmbedUrl',
              type: 'text',
              label: 'URL de embed do Spotify',
              admin: { description: 'Ex: https://open.spotify.com/embed/album/XXXXXXXXXXXXXXXXXXXXXX' },
              defaultValue: 'https://open.spotify.com/embed/album/1ebdDEzSK9Np7iVtZJYgtn?utm_source=generator&theme=0',
            },
            {
              name: 'musicCopy',
              type: 'textarea',
              label: 'Texto de apoio',
              defaultValue: 'Desaforo, Souvenir e Mar de Mármara, os singles autorais da banda — ouça direto aqui ou em qualquer plataforma.',
            },
            {
              name: 'musicNote',
              type: 'text',
              label: 'Nota abaixo dos links',
              defaultValue: 'Nosso primeiro EP está em produção.',
            },
          ],
        },
        {
          label: 'Vídeos',
          description: 'A lista de vídeos fica em Conteúdo > Vídeos.',
          fields: [
            half(
              { name: 'videosEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Vídeos' } as Field,
              { name: 'videosTitle', type: 'text', label: 'Título', defaultValue: 'Clipes' } as Field,
            ),
          ],
        },
        {
          label: 'Fotos',
          description: 'A galeria de fotos fica em Conteúdo > Fotos.',
          fields: [
            half(
              { name: 'fotosEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Fotos' } as Field,
              { name: 'fotosTitle', type: 'text', label: 'Título', defaultValue: 'Galeria' } as Field,
            ),
          ],
        },
        {
          label: 'Imprensa',
          description: 'As matérias ficam em Conteúdo > Imprensa.',
          fields: [
            half(
              { name: 'imprensaEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Imprensa' } as Field,
              { name: 'imprensaTitle', type: 'text', label: 'Título', defaultValue: 'Quem já falou sobre a gente' } as Field,
            ),
          ],
        },
        {
          label: 'Contato',
          fields: [
            half(
              { name: 'contatoEyebrow', type: 'text', label: 'Etiqueta da seção', defaultValue: 'Contato' } as Field,
              { name: 'contatoTitle', type: 'text', label: 'Título', defaultValue: 'Shows, imprensa e booking' } as Field,
            ),
            {
              name: 'whatsappButtonLabel',
              type: 'text',
              label: 'Texto do botão de WhatsApp',
              defaultValue: 'WhatsApp — chovvve',
            },
          ],
        },
      ],
    },
  ],
}
