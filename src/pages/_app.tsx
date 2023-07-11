import '@/styles/globals.css'
import { ReactElement, ReactNode } from 'react'

import { ApolloProvider } from '@apollo/client'
// eslint-disable-next-line import/no-named-as-default
import i18n from 'i18next'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { initReactI18next } from 'react-i18next'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { apolloClient } from '@/apollo-client'
import { useLoader } from '@/common'
import AuthProtection from '@/components/auth-components/auth-protection/AuthProtection'
import { AuthProvider } from '@/store/store'
import '../styles/nprogress.css'

// eslint-disable-next-line import/no-named-as-default-member
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
          unbanUser: 'Unban user',
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
            dateAdded: 'Date added',
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
          unban: {
            title: 'Unban user',
            description: 'Are you sure you want to unban this user',
            cancel: 'No',
            confirm: 'Yes',
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
          unbanUser: 'Разблокировать пользователя',
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
            dateAdded: 'Дата добавления',
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
          unban: {
            title: 'Разблокировать пользователя',
            description: 'Вы уверены, что хотите разблокировать пользователя',
            cancel: 'Нет',
            confirm: 'Да',
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
          unbanUser: 'Розблокувати користувача',
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
            dateAdded: 'Дата додавання',
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
          unban: {
            title: 'Розблокувати користувача',
            description: 'Ви впевнені, що хочете розблокувати цього користувача',
            cancel: 'Ні',
            confirm: 'Так',
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
          unbanUser: 'Разблакаваць карыстальніка',
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
            dateAdded: 'Дата дадання',
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
          unban: {
            title: 'Разблакаваць карыстальніка',
            description: 'Ці ўпэўненыя, што хочаце разблакаваць карыстальніка',
            cancel: 'Не',
            confirm: 'Так',
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
          userList: 'Rrwrrg wrr',
          postList: 'Rrwggwwr wrr',
          paymentsList: 'Urggghh wrr',
        },
        userList: {
          deleteUser: 'Rrwrrrr rrwrrgg',
          banUser: 'Rrwgg rrwrgwwr',
          unbanUser: 'Rrwrrrrrr rrwrgwwr',
          moreInfo: 'Rrwrrrw rrwrwwwr',
          search: 'Wwwrrahh',
          notSelected: 'Rrrrrwr',
          notBlocked: 'Rrrrrrrrrr',
          blocked: 'Urrr',
          show: 'Rrrrwrr',
          onPage: 'Urrr',
          table: {
            profileLink: 'Rrwrrwwwr rrwwwrr',
            username: 'Rrwrrrwwwrrrr',
            userId: 'Rrwrr ID',
            dateAdded: 'Rrrr rrrrwrr',
          },
          ban: {
            title: 'Rrwrgwwr rrwrrrr',
            description: 'Rrwrrrrrwrr rwrrgwwr rrwrrrwwrr rrrwrwwwr',
            cancel: 'Grrrr',
            confirm: 'Rrrrr',
            reason: {
              title: 'Rrwrrrw rrwrrrr',
              anotherReason: 'Urrrrghh rrwrrrr',
              behavior: 'Grrrgh rrrrrrw',
              advertising: 'Rrwrrrrrrrrrrr rrrrrrrrr',
            },
          },
          unban: {
            title: 'Rrwrrrrrr rrwrrrr',
            description: 'Rrwrrrrrwrr rwrrgwwr rrwrrrwwrr',
            cancel: 'Grrrr',
            confirm: 'Rrrrr',
          },
          delete: {
            title: 'Rrwrrrw rrwrrrr',
            description: 'Urrghh rrrggghh grrrrh urrggghh',
            cancel: 'Grrrr',
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

  useLoader()

  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProtection> {getLayout(<Component {...pageProps} />)}</AuthProtection>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ApolloProvider>
    </AuthProvider>
  )
}
