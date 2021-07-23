import React, { createContext, useState } from 'react'

export const SettingContext = createContext(null)

const SettingContexProvider = (props) => {
    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExcuting] = useState({})
    const [startAnimate, setstartAnimate] = useState(false)

    function setCurrentTimer(active_state) {
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }

    // start animation fn
    function startTimer() {
        setstartAnimate(true)
    }

    // pause animation fn
    function pauseTimer() {
        setstartAnimate(false)
    }

    // pass time to counter
    const children = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        const updateType = (evalute) => {
            // eslint-disable-next-line default-case
            switch (evalute.active) {
                case 'work':
                    return 'Work'
                case 'short':
                    return 'Short Break'
                case 'long':
                    return 'long Break'
            }
        }

        return <div className='timer-box'>
            <div className='curr-timer'>
                {seconds === 0 ? `${minutes}:00`: `${minutes}:${seconds}`}
            </div>
            <div className='active-timer'>{updateType(executing)}</div>
        </div>
    }

    // clear session storage
    const SettingsBtn = () => {
        setExcuting({})
        setPomodoro(0)
    }

    const updateExecute = (updateSettings) => {
        setExcuting(updateSettings)
        setTimerTime(updateSettings)
    }

    const setTimerTime = (evalute) => {
        switch (evalute.active) {
            case 'work':
                setPomodoro(evalute.work)
                break;
            case 'short':
                setPomodoro(evalute.short)
                break;
            case 'long':
                setPomodoro(evalute.long)
                break;
            default:
                setPomodoro(0)
                break;
        }
    }

    function stopAimate() {
        setstartAnimate(false)
    }

    return (
        <SettingContext.Provider
            value={{
                pomodoro,
                executing,
                updateExecute,
                startAnimate,
                startTimer,
                pauseTimer,
                children,
                SettingsBtn,
                setCurrentTimer,
                stopAimate
            }}>
            {props.children}
        </SettingContext.Provider>
    )
}

export default SettingContexProvider
