import '@/styles/globals.css'
import { ReactElement, ReactNode } from 'react'

import { ApolloProvider } from '@apollo/client'
import i18n from 'i18next'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { initReactI18next } from 'react-i18next'

import { apolloClient } from '@/apollo-client'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        navigation: {
          statistics: 'Statistics',
          userList: 'Users list',
          postList: 'Posts list',
          paymentsList: 'Payments list',
        },
        userList: {
          deleteUser: 'Delete user',
          banUser: 'Ban in the system',
          moreInfo: 'More information',
          search: 'Search',
          notSelected: 'Not selected',
          notBlocked: 'Not blocked',
          blocked: 'Blocked',
          show: 'Show',
          onPage: 'on Page',
          table: {
            profileLink: 'Profile link',
            username: 'Username',
            userId: 'User ID',
            dataAdded: 'Date added',
          },
          ban: {
            title: 'Ban user',
            description: 'Are you sure you want to ban this user',
            cancel: 'No',
            confirm: 'Yes',
            reason: {
              title: 'Reason for ban',
              anotherReason: 'Another reason',
              behavior: 'Bad behavior',
              advertising: 'Advertising placement',
            },
          },
          delete: {
            title: 'Delete user',
            description: 'Are you sure you want to delete user',
            cancel: 'No',
            confirm: 'Yes',
          },
        },
      },
    },
    ru: {
      translation: {
        navigation: {
          statistics: 'Статистика',
          userList: 'Список пользователей',
          postList: 'Список постов',
          paymentsList: 'Список платежей',
        },
        userList: {
          deleteUser: 'Удалить пользователя',
          banUser: 'Заблокировать в системе',
          moreInfo: 'Больше информации',
          search: 'Поиск',
          notSelected: 'Не выбрано',
          notBlocked: 'Не заблокировано',
          blocked: 'Заблокировано',
          show: 'Показать',
          onPage: 'на странице',
          table: {
            profileLink: 'Ссылка на профиль',
            username: 'Имя пользователя',
            userId: 'ID пользователя',
            dataAdded: 'Дата добавления',
          },
          ban: {
            title: 'Заблокировать пользователя',
            description: 'Вы уверены, что хотите заблокировать пользователя',
            cancel: 'Нет',
            confirm: 'Да',
            reason: {
              title: 'Причина блокировки',
              anotherReason: 'Другая причина',
              behavior: 'Плохое поведение',
              advertising: 'Размещение рекламы',
            },
          },
          delete: {
            title: 'Удалить пользователя',
            description: 'Вы уверены, что хотите удалить пользователя',
            cancel: 'Нет',
            confirm: 'Да',
          },
        },
      },
    },
    uk: {
      translation: {
        navigation: {
          statistics: 'Статистика',
          userList: 'Список користувачів',
          postList: 'Список постів',
          paymentsList: 'Список платежів',
        },
        userList: {
          deleteUser: 'Видалити користувача',
          banUser: 'Заблокувати в системі',
          moreInfo: 'Більше інформації',
          search: 'Пошук',
          notSelected: 'Не обрано',
          notBlocked: 'Не заблоковано',
          blocked: 'Заблоковано',
          show: 'Показати',
          onPage: 'на сторінці',
          table: {
            profileLink: 'Посилання на профіль',
            username: "Ім'я користувача",
            userId: 'ID користувача',
            dataAdded: 'Дата додавання',
          },
          ban: {
            title: 'Заблокувати користувача',
            description: 'Ви впевнені, що хочете заблокувати цього користувача',
            cancel: 'Ні',
            confirm: 'Так',
            reason: {
              title: 'Причина блокування',
              anotherReason: 'Інша причина',
              behavior: 'Погана поведінка',
              advertising: 'Розміщення реклами',
            },
          },
          delete: {
            title: 'Видалити користувача',
            description: 'Ви впевнені, що хочете видалити користувача',
            cancel: 'Ні',
            confirm: 'Так',
          },
        },
      },
    },
    be: {
      translation: {
        navigation: {
          statistics: 'Статыстыка',
          userList: 'Спіс карыстальнікаў',
          postList: 'Спіс паведамленняў',
          paymentsList: 'Спіс плацяжоў',
        },
        userList: {
          deleteUser: 'Выдаліць карыстальніка',
          banUser: 'Заблакаваць у сістэме',
          moreInfo: 'Больш інфармацыі',
          search: 'Пошук',
          notSelected: 'Не выбрана',
          notBlocked: 'Не заблакавана',
          blocked: 'Заблакавана',
          show: 'Паказаць',
          onPage: 'на старонцы',
          table: {
            profileLink: 'Спасылка на профіль',
            username: 'Імя карыстальніка',
            userId: 'ID карыстальніка',
            dataAdded: 'Дата дадання',
          },
          ban: {
            title: 'Заблакаваць карыстальніка',
            description: 'Ці ўпэўненыя, што хочаце заблакаваць гэтага карыстальніка',
            cancel: 'Не',
            confirm: 'Так',
            reason: {
              title: 'Прычына блакавання',
              anotherReason: 'Іншая прычына',
              behavior: 'Паганае паводзіны',
              advertising: 'Размяшчэнне рэкламы',
            },
          },
          delete: {
            title: 'Выдаліць карыстальніка',
            description: 'Ці ўпэўненыя, што хочаце выдаліць карыстальніка',
            cancel: 'Не',
            confirm: 'Так',
          },
        },
      },
    },
    wookie: {
      translation: {
        navigation: {
          statistics: 'Rrwgawr',
          userList: 'Rrwrrg list',
          postList: 'Rrwggwwr list',
          paymentsList: 'Rrrrrr list',
        },
        userList: {
          deleteUser: 'Rrwrrrr rrwrrgg',
          banUser: 'Rrwgg rrwrgwwr',
          moreInfo: 'Rrwrrrw rrwrwwwr',
          search: 'Rrrwrrr',
          notSelected: 'Rrrrrwr',
          notBlocked: 'Rrrrrrrrrr',
          blocked: 'Rrwrrrrrr',
          show: 'Rrrrwrr',
          onPage: 'rrrr rrrrwrr',
          table: {
            profileLink: 'Rrwrrwwwr rrwwwrr',
            username: 'Rrwrrrwwwrrrr',
            userId: 'Rrwrr ID',
            dataAdded: 'Rrrr rrrrwrr',
          },
          ban: {
            title: 'Rrwrgwwr rrwrrrr',
            description: 'Rrwrrrrrwrr rwrrgwwr rrwrrrwwrr rrrwrwwwr',
            cancel: 'Rrrr',
            confirm: 'Rrrrr',
            reason: {
              title: 'Rrwrrrw rrwrrrr',
              anotherReason: 'Rrrrrrr rrwrrrr',
              behavior: 'Rrrrrr rrrrrrw',
              advertising: 'Rrwrrrrrrrrrrr rrrrrrrrr',
            },
          },
          delete: {
            title: 'Rrwrrrw rrwrrrr',
            description: 'Rrwrrrrrwrr rwrrgwwr rrwrrrwwrr',
            cancel: 'Rrrr',
            confirm: 'Rrrrr',
          },
        },
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
  )
}
