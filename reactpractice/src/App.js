import React, { Component } from "react";
import MatchCard from "./components/HelmetCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctClicks = 0;
let bestScore = 0;
let clickMessage = "Click on a helmet to earn points, only click once per team!";

class App extends Component {

    state = {
        matches,
        correctClicks,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        const matches = this.state.matches;
        const clickedMatch = matches.filter(match => match.id === id);

        if (clickedMatch[0].clicked){

            console.log ("Correct Clicks: " + correctClicks);
            console.log ("Best Score: " + bestScore);

            correctClicks = 0;
            clickMessage = "You already clicked on that one! Game Over!"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctClicks });
            this.setState({matches});

        } else if (correctClicks < 16) {

            clickedMatch[0].clicked = true;
            correctClicks++;
            clickMessage = "Super! You haven't clicked on that one yet! Keep going!";

            if (correctClicks > bestScore){
                bestScore = correctClicks;
                this.setState({ bestScore });
            }
           
            matches.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({ matches });
            this.setState({correctClicks});
            this.setState({clickMessage});
        } else {

            clickedMatch[0].clicked = true;
            correctClicks = 0;
            clickMessage = "WOO HOO!!! You got them ALL!!! Now, let's see if you can do it again!";
            bestScore = 16;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            matches.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({ matches });
            this.setState({correctClicks});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <div className="jumbotron">
                <Title>AFC Memory Game</Title>
                </div>
                <h2 className="scoreSummary">
                    {this.state.clickMessage}
                </h2>
                
                <h3 className="scoreSummary">
                    Correct Clicks: {this.state.correctClicks} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
                
            </Wrapper>
        );
    }
}

export default App;
