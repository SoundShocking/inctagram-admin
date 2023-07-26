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
          postList: 'PostsList list',
          paymentsList: 'Payments list',
          logout: 'Logout',
        },
        userInfo: {
          userInfoMain: {
            backUsersList: 'Back to Users List',
            linkProfile: 'Link profile',
            userID: 'UserId',
            profileCreationDate: 'Profile Creation Date',
          },
          tabs: {
            uploadPhotos: 'Upload Photos',
            payments: 'Payments',
            followers: 'Followers',
            following: 'Following',
          },
        },
        postsList: {
          publishedPosts: 'Published posts',
          bannedPosts: 'Banned posts',
          banPost: 'Block post',
          unbanPost: 'Unblock post',
          post: {
            showMore: 'Show more',
            showHide: 'Show hide',
          },
          ban: {
            title: 'Ban post',
            description: 'Are you sure you want to ban this post',
            cancel: 'No',
            confirm: 'Yes',
            reason: {
              title: 'Reason for ban',
              ANOTHER_REASON: 'Another reason',
              SEXUAL_CONTENT: 'Sexual Content',
              VIOLENCE_AND_CRUELTY: 'Violence and Cruelty',
              DISCRIMINATION_AND_HATE: 'Discrimination and Hate',
              SPAM_AND_SCAMS: 'Spam and Scams',
              COPYRIGHT_INFRINGEMENT: 'Copyright Infringement',
              INAPPROPRIATE_BEHAVIOR: 'Inappropriate Behavior',
              PRIVACY_VIOLATION: 'Privacy Violation',
              ILLEGAL_ACTIVITIES: 'Illegal Activities',
              SHOCKING_OR_DISTURBING_CONTENT: 'Shocking or Disturbing Content',
              CONTROVERSIAL_TOPICS: 'Controversial Topics',
            },
          },
          unban: {
            title: 'Unban post',
            description: 'Are you sure you want to unban this post',
            cancel: 'No',
            confirm: 'Yes',
          },
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
              add: 'Add your reason',
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
        datePicker: {
          monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
          logout: 'Выйти',
        },
        userInfo: {
          userInfoMain: {
            backUsersList: 'Вернуться к списку пользователей',
            linkProfile: 'Ссылка на профиль',
            userID: 'Идентификатор пользователя',
            profileCreationDate: 'Дата создания профиля',
          },
          tabs: {
            uploadPhotos: 'Загрузить фото',
            payments: 'Платежи',
            followers: 'Подписчики',
            following: 'Подписки',
          },
        },
        postsList: {
          publishedPosts: 'Опубликованные посты',
          bannedPosts: 'Заблокированные посты',
          banPost: 'Заблокировать пост',
          unbanPost: 'Разблокировать пост',
          post: {
            showMore: 'Показать больше',
            showHide: 'Cкрыть',
          },
          ban: {
            title: 'Блокировка поста',
            description: 'Вы уверены, что хотите заблокировать этот пост?',
            cancel: 'Нет',
            confirm: 'Да',
            reason: {
              title: 'Причина блокировки:',
              ANOTHER_REASON: 'Другая причина',
              SEXUAL_CONTENT: 'Сексуальный контент',
              VIOLENCE_AND_CRUELTY: 'Насилие и жестокость',
              DISCRIMINATION_AND_HATE: 'Дискриминация и ненависть',
              SPAM_AND_SCAMS: 'Спам и мошенничество',
              COPYRIGHT_INFRINGEMENT: 'Нарушение авторских прав',
              INAPPROPRIATE_BEHAVIOR: 'Неуместное поведение',
              PRIVACY_VIOLATION: 'Нарушение конфиденциальности',
              ILLEGAL_ACTIVITIES: 'Противозаконная деятельность',
              SHOCKING_OR_DISTURBING_CONTENT: 'Шокирующий или тревожный контент',
              CONTROVERSIAL_TOPICS: 'Контроверзные темы',
            },
          },
          unban: {
            title: 'Разбанить Пост',
            description: 'Вы уверены, что хотите разбанить этот пост?',
            cancel: 'Нет',
            confirm: 'Да',
          },
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
              add: 'Добавьте причину',
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
        datePicker: {
          monthNames: [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
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
          logout: 'Вийти',
        },
        userInfo: {
          userInfoMain: {
            backUsersList: 'Повернутися до списку користувачів',
            linkProfile: 'Посилання на профіль',
            userID: 'Ідентифікатор користувача',
            profileCreationDate: 'Дата створення профілю',
          },
          tabs: {
            uploadPhotos: 'Завантажити Фото',
            payments: 'Платежі',
            followers: ' Підписники ',
            following: ' Підписатися ',
          },
        },
        postsList: {
          publishedPosts: 'Опубліковані пости',
          bannedPosts: 'Заборонені пости',
          banPost: 'Заблокувати пост',
          unbanPost: 'Розблокувати пост',
          post: {
            showMore: 'Показати більше',
            showHide: 'Cховати',
          },
          ban: {
            title: 'Заборона поста',
            description: 'Ви впевнені, що хочете заборонити цей пост?',
            cancel: 'Ні',
            confirm: 'Так',
            reason: {
              title: 'Причина заборони',
              ANOTHER_REASON: 'Інша причина',
              SEXUAL_CONTENT: 'Сексуальний контент',
              VIOLENCE_AND_CRUELTY: 'Насильство і жорстокість',
              DISCRIMINATION_AND_HATE: 'Дискримінація та ненависть',
              SPAM_AND_SCAMS: 'Спам і шахрайство',
              COPYRIGHT_INFRINGEMENT: 'Порушення авторських прав',
              INAPPROPRIATE_BEHAVIOR: 'Неадекватна поведiнка',
              PRIVACY_VIOLATION: 'Порушення конфiдeнцiaльноcтi',
              ILLEGAL_ACTIVITIES: 'Незаконна дiяльнicть',
              SHOCKING_OR_DISTURBING_CONTENT: 'Шoкуючий абo тривожний кoнтент',
              CONTROVERSIAL_TOPICS: 'Контрверcные теми',
            },
          },
          unban: {
            title: 'Розблокувати пост',
            description: 'Ви впевнені, що хочете розблокувати цей пост?',
            cancel: 'Ні',
            confirm: 'Так',
          },
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
              add: 'Додайте причину',
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
        datePicker: {
          monthNames: [
            'Січень',
            'Лютий',
            'Березень',
            'Квітень',
            'Травень',
            'Червень',
            'Липень',
            'Серпень',
            'Вересень',
            'Жовтень',
            'Листопад',
            'Грудень',
          ],
          dayNamesShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
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
          logout: 'Выйсці',
        },
        userInfo: {
          userInfoMain: {
            backUsersList: 'Вярнуцца да спiсу карыстальнiкоў',
            linkProfile: 'Спасылка на прафайл',
            userID: 'Ідэнтыфікатар карыстальнiка',
            profileCreationDate: 'Дата стварэння прафайла',
          },
          tabs: {
            uploadPhotos: 'Загрузце Фатаграфіі',
            payments: 'Аплата',
            followers: 'Наконт',
            following: 'Сачыць',
          },
        },
        postsList: {
          publishedPosts: 'Опубликованные посты',
          bannedPosts: 'Заблокированные посты',
          banPost: 'Заблокировать пост',
          unbanPost: 'Разблокировать пост',
          post: {
            showMore: 'Паказаць больш',
            showHide: 'Схаваць',
          },
          ban: {
            title: 'Блокировка поста',
            description: 'Вы уверены, что хотите заблокировать этот пост?',
            cancel: 'Нет',
            confirm: 'Да',
            reason: {
              title: 'Причина блокировки',
              ANOTHER_REASON: 'Другая причина',
              SEXUAL_CONTENT: 'Сексуальный контент',
              VIOLENCE_AND_CRUELTY: 'Насилие и жестокость',
              DISCRIMINATION_AND_HATE: 'Дискриминация и ненависть',
              SPAM_AND_SCAMS: 'Спам и мошенничество',
              COPYRIGHT_INFRINGEMENT: 'Нарушение авторских прав',
              INAPPROPRIATE_BEHAVIOR: 'Неуместное поведение',
              PRIVACY_VIOLATION: 'Нарушение конфиденциальности',
              ILLEGAL_ACTIVITIES: 'Противоправная деятельность',
              SHOCKING_OR_DISTURBING_CONTENT: 'Шокирующий или тревожный контент',
              CONTROVERSIAL_TOPICS: 'Контроверзные темы',
            },
          },
          unban: {
            title: 'Разбанить сообщение',
            description: 'Вы уверены, что хотите разбанить это сообщение',
            cancel: 'Нет',
            confirm: 'Да',
          },
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
              add: 'Дадайце прычыну',
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
        datePicker: {
          monthNames: [
            'Студзень',
            'Люты',
            'Сакавік',
            'Красавік',
            'Май',
            'Чэрвень',
            'Ліпень',
            'Жнівень',
            'Верасень',
            'Кастрычнiк',
            'Лiстапад',
            'Снежань',
          ],
          dayNamesShort: ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'],
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
          logout: 'grrrwahh',
        },
        userInfo: {
          userInfoMain: {
            backUsersList: 'Rruurh rrragwah aarh ruuwoor ururrrgh!',
            linkProfile: 'Graaawoo roo aaarghrooworraggwoo!',
            userID: 'Roowoorc ruuruugh argh woorarrggch awwrroooc?',
            profileCreationDate: 'Woorac raaghrugwaa oohra grawoo!',
          },
          tabs: {
            uploadPhotos: 'Grahhgggghhrrr gruhhgah',
            payments: 'Ryyyrgh grawwwwww',
            followers: 'Grrruuugh rarghhh',
            following: 'Ryyyrgg rrararaghh',
          },
        },
        postsList: {
          publishedPosts: 'Wrrraaarghbaaaarrrrgh! Ggggrrwwaahhh!',
          bannedPosts: 'Gggwwoooorrgghhhh! Bbbbrrraaarrrrghhh!',
          banPost: 'Bbbbbbwwwwwaaaaarrrrgghhhaaaaaaaa!',
          unbanPost: 'Rrwarrggaawwrrooowwwwww!',
          post: {
            showMore: 'Rrworr! Rwoooaarrgh!',
            showHide: 'Rrroowwrrgg!',
          },
          ban: {
            title: 'Rrwowwrrr woorwoorwor',
            description: 'Wwwrrr rwwoworwo rrwowwowo rwowo?',
            cancel: 'Rwrw',
            confirm: 'Woor',
            reason: {
              title: 'Grrrargh urrgggh rarrggh',
              ANOTHER_REASON: 'Rrrggghhh argggh grrragh',
              SEXUAL_CONTENT: 'Rrwoww rarrgh awwrrrar!',
              VIOLENCE_AND_CRUELTY: 'Rroowwgrrraaaghhh waaaarrggh',
              DISCRIMINATION_AND_HATE: 'Arrrgh ruurrgggrhh ',
              SPAM_AND_SCAMS: 'Rrroowwwoooo arrrwha!',
              COPYRIGHT_INFRINGEMENT: 'Aaaawrrr aarrrgghh ',
              INAPPROPRIATE_BEHAVIOR: 'Bbbbrrraaarrrrghhh! wrr',
              PRIVACY_VIOLATION: 'Aaaarrragghuuhwaaa uuggggguhhuughhh! ',
              ILLEGAL_ACTIVITIES: 'Grrrwahraaarrhgh d haaawooh!',
              SHOCKING_OR_DISTURBING_CONTENT: 'Aaaarrragghuuhwaaa uuggggguhhuughhh!',
              CONTROVERSIAL_TOPICS: 'Waaaaahooowwwww ahrurruuh!',
            },
          },
          unban: {
            title: 'Розблокувати пост',
            description: 'Ви впевнені, що хочете розблокувати цей пост?',
            cancel: 'Ні',
            confirm: 'Так',
          },
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
              add: 'Rrwrrrr urrggghh',
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
        datePicker: {
          monthNames: [
            'Rugger',
            'Favroor',
            'Craaboo',
            'Moota',
            'Pinaar',
            'Sitho',
            'Kashyyyk',
            'Urrrurr',
            'Husshun',
            'Yoomool',
            "Dreepwoo'",
            "'Wooroon",
          ],
          dayNamesShort: ['Sha', 'Gaw', 'Dal', 'Eem', 'Nyo', 'Vok', 'Oow'],
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
