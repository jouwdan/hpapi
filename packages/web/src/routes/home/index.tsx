import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation(`home`)
  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          {t(`title`)}
          {t(`description`)}
        </p>
      </header>
    </div>
  )
}

export default Home
