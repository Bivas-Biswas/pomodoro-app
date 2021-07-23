import React, { useContext } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { SettingContext } from '../Context/SettingContex'

const CountdownAnimation = ({timer, animate, children }) => {

    const { executing, setCurrentTimer } = useContext(SettingContext)

    const handleColor=()=>{
        switch (executing.active) {
            case 'work':
                return [['#FE4D4C']]

            case 'short':
                return [['#05EB8B']]

            case 'long':
                return [['#0BBCDA']]

            default:
                break;
        }
    }
    return (
        <CountdownCircleTimer

            isPlaying={animate}
            duration={timer * 60}
            colors={
                handleColor()
                }
            strokeWidth={6}
            size={220}
            trailColor="#151932"
            onComplete={() => {
                switch (executing.active) {
                    case 'work':
                        setCurrentTimer('short')
                        break;
                    case 'short':
                        setCurrentTimer('long')
                        break;
                    case 'long':
                        setCurrentTimer('work')
                        break;
                    default:
                        break;
                }
            }}
        >
            {children}
        </CountdownCircleTimer
>
    )
}

export default CountdownAnimation
