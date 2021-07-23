import React, {useContext, useState, useEffect} from 'react'
import {SettingContext} from '../Context/SettingContex'
import Slider from '@material-ui/core/Slider';
import {withStyles, makeStyles} from "@material-ui/core/styles";

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const useStyles = makeStyles({
    root: {
        color: props => props.color,
    },
});

const SetPomodoro = () => {

    const [newTimer, setNewTimer] = useState({
        work: 25,
        short: 5,
        long: 15,
        active: 'work'
    })

    const {updateExecute} = useContext(SettingContext)

    // get local stroge value
    useEffect(() => {
        let curr = JSON.parse(localStorage.getItem('time'))
        if(curr){
            setNewTimer(curr)
        }
    }, []);

    // update local stroge
    useEffect(() => {
        localStorage.setItem('time', JSON.stringify(newTimer));
    }, [newTimer]);

    const handleChange = name => (input, value) => {
        // eslint-disable-next-line default-case
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateExecute(newTimer)
    }

    const handleReset = () => {
        const resetValue = {
            ...newTimer,
            work: 25,
            short: 5,
            long: 15
        }
        setNewTimer(resetValue)
    }

    return (
        <div className="form-container">
            <button onClick={handleReset}>Reset</button>
            <form noValidate onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <h1>Timer</h1>

                    {/*Focus slider 1*/}
                    <h3>Focus</h3>
                    <p>{newTimer.work}:00</p>
                    <PrettoSlider
                        classes={{
                            root: useStyles({color: '#FE4D4C'}).root
                        }}
                        value={newTimer.work}
                        min={1}
                        max={90}
                        onChange={handleChange('work')}
                    />

                    {/*Short Break slider 2*/}
                    <h3>Short Break</h3>
                    <p>{newTimer.short}:00</p>
                    <PrettoSlider
                        classes={{
                            root: useStyles({color: '#05EB8B'}).root
                        }}
                        value={newTimer.short}
                        min={1}
                        max={90}
                        onChange={handleChange('shortBreak')}/>

                    {/*Long Break slider 3*/}
                    <h3>Long Break</h3>
                    <p>{newTimer.long}:00</p>
                    <PrettoSlider
                        classes={{
                            root: useStyles({color: '#0BBCDA'}).root
                        }}
                        value={newTimer.long}
                        min={1}
                        max={90}
                        onChange={handleChange('longBreak')}/>
                </div>

                <button type='submit'>Set Timer</button>

            </form>
        </div>
    )
}

export default SetPomodoro
