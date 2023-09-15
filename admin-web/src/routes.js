import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const ExerciseVideo = React.lazy(() => import('./views/exercise/addvideo/addVideo'))
const ExerciseArticle = React.lazy(() => import('./views/exercise/addarticle/addArticle'))

const MeditationVideo = React.lazy(() => import('./views/meditation/addvideo/addVideo'))
const MeditationArticle = React.lazy(() => import('./views/meditation/addarticle/addArticle'))

const EatingArticle = React.lazy(() => import('./views/eating/addarticle/addArticle'))

const SocialArticle = React.lazy(() => import('./views/social/addarticle/addArticle'))

const ReadingArticle = React.lazy(() => import('./views/reading/addarticle/addArticle'))
const ReadingBook = React.lazy(() => import('./views/reading/addbook/addBook'))

const MovementArticle = React.lazy(() => import('./views/movement/addarticle/addArticle'))

const WaterArticle = React.lazy(() => import('./views/water/addarticle/addArticle'))

const FinanceVideo = React.lazy(() => import('./views/finance/addvideo/addVideo'))
const FinanceBook = React.lazy(() => import('./views/finance/addbook/addBook'))

const KindnessArticle = React.lazy(() => import('./views/kindness/addarticle/addArticle'))
const ScreenArticle = React.lazy(() => import('./views/screen/addarticle/addArticle'))

const JournalArticle = React.lazy(() => import('./views/journal/addarticle/addArticle'))
const JournalBook = React.lazy(() => import('./views/journal/addbook/addBook'))

const Login = React.lazy(() => import('./views/pages/login/Login'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/exercise/addvideo', name: 'Exercise Videos', element: ExerciseVideo },
  { path: '/exercise/addarticle', name: 'Exercise Articles', element: ExerciseArticle },

  { path: '/meditation/addvideo', name: 'Meditation Videos', element: MeditationVideo },
  { path: '/meditation/addarticle', name: 'Meditation Articles', element: MeditationArticle },

  { path: '/eating/addarticle', name: 'Eating Articles', element: EatingArticle },

  { path: '/social/addarticle', name: 'Social Articles', element: SocialArticle },

  { path: '/reading/addarticle', name: 'Reading Articles', element: ReadingArticle },
  { path: '/reading/addbook', name: 'Reading Books', element: ReadingBook },

  { path: '/movement/addarticle', name: 'Movement Articles', element: MovementArticle },

  { path: '/water/addarticle', name: 'Water Articles', element: WaterArticle },
  
  { path: '/finance/addvideo', name: 'Finance Videos', element: FinanceVideo },
  { path: '/finance/addbook', name: 'Finance Books', element: FinanceBook },
  
  { path: '/kindness/addarticle', name: 'Kindness Articles', element: KindnessArticle },
  { path: '/screen/addarticle', name: 'Screen Articles', element: ScreenArticle },

  { path: '/journal/addarticle', name: 'Journal Articles', element: JournalArticle },
  { path: '/journal/addbook', name: 'Journal Books', element: JournalBook },
]

export default routes
