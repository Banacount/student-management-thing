import settingsIcon from '../assets/settings.svg'
import profileIcon from '../assets/profile.svg'
import './DashboardMenu.css'

function dashboardMenu () {
	return (
		<>
			<div className="fk-mobile-contain">
				<p>No screen reponsiveness yet</p>
			</div>

			<div className="dashboard-contain">
				<div className="tool-panel">
					<div className="page-title">
						STUDENT <br /> MANAGER
					</div>

					<div className="tools-contain">
						<button>Students</button>
						<button>Grades</button>
						<button>Review requests</button>
						<button>Logs</button>
						<button>Generate Joke :3</button>
					</div>

					<div className="config-contain">
						<img src={settingsIcon} alt="Settings button" onClick={() => { console.log("Settings button lmao") }} />
						<img src={profileIcon} alt="Settings button" onClick={() => { window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1', '_blank') }} />
					</div>
				</div>

				<div className="info-panel">
					<h2 className='m-2'>HELLO, [Insert teacher name]</h2>
				</div>
			</div>
		</>
	)
}

export default dashboardMenu;
