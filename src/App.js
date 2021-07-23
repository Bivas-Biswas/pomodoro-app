import React, {useContext, useEffect} from "react";
import Button from "./Components/Button";
import CountdownAnimation from "./Components/CountdownAnimation";
import SetPomodoro from "./Components/SetPomodoro";
import {SettingContext} from "./Context/SettingContex";
import './scss/main.scss'

const App = () => {
    const {
        pomodoro,
        executing,
        startAnimate,
        children,
        startTimer,
        pauseTimer,
        updateExecute,
        setCurrentTimer,
        SettingsBtn

    } = useContext(SettingContext)
    // console.log(pomodoro)

    useEffect(() => {
        updateExecute(executing)
    }, [updateExecute,executing, startAnimate])

    return (
        <div className="container">
            {pomodoro !== 0 ?
                <>
                    <h1 className='main-header'>Pomodoro</h1>
                    <small>Be productive the right way.</small>
                    <ul className="labels">
                        <li>
                            <Button
                                title="Work"
                                activeClass={executing.active === 'work' ? 'active-label' : undefined}
                                _callback={() => {setCurrentTimer('work')}}
                            />
                        </li>
                        <li>
                            <Button
                                title="Short Break"
                                activeClass={executing.active === 'short' ? 'active-label' : undefined}
                                _callback={() => setCurrentTimer('short')}
                            />
                        </li>
                        <li>
                            <Button
                                title="Long Break"
                                activeClass={executing.active === 'long' ? 'active-label' : undefined}
                                _callback={() => setCurrentTimer('long')}
                            />
                        </li>
                    </ul>
                    <Button title="Settings" _callback={SettingsBtn} />
                    <div className="timer-container">
                        <div className="time-wrapper">
                            <CountdownAnimation
                                key={pomodoro}
                                timer={pomodoro}
                                animate={startAnimate}
                            >
                                {children}
                            </CountdownAnimation>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <Button title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
                        <Button title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
                    </div>
                </> : <SetPomodoro />}
        </div>
    );
}

export default App;
