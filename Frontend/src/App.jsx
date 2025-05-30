import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function App() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://sports-tracker.onrender.com/api/getUpcomingSoccer')
        const data = await response.json()
        console.log(data)
        setMatches(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])


  

  return (
    <div className="min-h-screen bg-[#fff7f0]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 text-white flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span className="text-4xl">⚽</span>
          <span className="text-4xl font-bold">Football Match Tracker</span>
        </div>
        <div className="m-2 text-lg">Stay updated with upcoming football games and recent results</div>
      </div>

      {/* Section Title */}
      <div className="text-center mt-8 mb-2 text-3xl font-bold">Upcoming Games & Recent Results</div>
      <div className="text-center mb-8 text-gray-500">
        Found {matches.length} matches in the next 7 days
      </div>
      {
  error && (
    <div className="text-center text-red-500 font-bold mb-4">
      Something went wrong In API : {error.message}
    </div>
  )
}

      {
        loading ? (
          <div className="grid gap-6 px-4 md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">
            <Skeleton height={150} baseColor="#a0a0a0" highlightColor="#c0c0c0"  />
            <Skeleton height={150} baseColor="#a0a0a0" highlightColor="#c0c0c0" />
            <Skeleton height={150} baseColor="#a0a0a0" highlightColor="#c0c0c0"/>
            <Skeleton height={150} baseColor="#a0a0a0" highlightColor="#c0c0c0" />
          </div>
        ): (
            <div className="grid gap-6 px-4 md:grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto">

              {matches.map((match) => {
                return (
                  <div key={match.id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
                    {/* Stage and Date */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold`}>
                        {match.stage}
                      </span>
                      {match.date && (
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <span>🕒</span>
                          {/* {formatDate(match.date)}, {formatTime(match.date)} */}
                          {match.date},{match.time}
                        </span>
                      )}
                    </div>

                    {/* Competition Info */}
                    {match.competition && (
                      <div className="text-center text-sm text-blue-600 font-medium">
                        {match.competition}
                      </div>
                    )}

                    {/* Teams */}
                    <div className="flex items-center justify-between">
                      {/* Home Team */}
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <img
                            src={match.homeTeamLogo}
                            alt={match.homeTeam}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-sm">{match.homeTeam}</div>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="mx-2 text-gray-400 font-bold">VS</div>

                      {/* Away Team */}
                      <div className="flex items-center gap-3 flex-1 justify-end">
                        <div>
                          <div className="font-bold text-right text-sm">{match.awayTeam}</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <img
                            src={match.awayTeamLogo}
                            alt={match.awayTeam}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* League Info */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <img
                        src={match.leagueLogo}
                        alt={match.league}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-sm text-gray-600">{match.league}</span>
                    </div>

                  </div>
                )
              })}


            </div>
        )
      } 
    </div>
  )
}

export default App 


