import React from 'react';

export default class GuessForm extends React.Component {

    render = () => {
        ////console.log(this.props)
        if (!this.props) {
            throw new Error("No props.");
        }
        if (this.props.submitted === null || !this.props.submitHandler) {
            throw new Error("Prop content error.");
        }
        let { submitted, submitHandler, currentWord} = this.props;
        if (!submitted) {
            return (
                <div>
                    <h2>Translate the word:</h2>
                    <span className="currentWord">{ currentWord }</span>
                    <form onSubmit={ submitHandler }>
                        <fieldset className={ `GuessForm` }>
                            <legend className="legend">Guess:</legend>
                            <label htmlFor="learn-guess-input">What's the translation for this word?</label>
                            <input name='guess' id="learn-guess-input" type="text" required></input>
                            <button type='submit'>Submit your answer</button>
                        </fieldset>
                    </form>
                </div >
            )
        }
        else {
            return <></>;
        }


    }
}