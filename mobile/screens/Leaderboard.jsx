import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTopScores } from '../api/score';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const reload = () => {
            getTopScores(1).then(response => {
                console.log(response.data);
                setLeaderboard(response.data.persons);
            })
            .catch(err => {
                console.log(err);
            });
        }

        reload();
        let interval = setInterval(() => reload(), 5000);

        return () => clearInterval(interval); 
    }, []);
    return (
    <View style={{
        flex: 1,
        backgroundColor: "#2ecc71",
    }}>
        {/* Create an entry for each person in the leaderboard, each entry will have a text indicating the name and the score */}
        {leaderboard.map((person, index) => {
            return <View key={index} style={{
                flexDirection: "row",
                backgroundColor: "#27ae60",
                // borderColor: "#0a6b33",
                // borderWidth: 3,
                margin: 10,
                borderRadius: 10,
                justifyContent: "space-between",
                padding: 10,
                alignItems: "center",
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "bold",
                }}>{person.username}</Text>
                <Text style={{
                    color: "#089e46",
                    backgroundColor: "#FFF",
                    fontSize: 20,
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                }}>{person.score}</Text>
            </View>
        })}
    </View>
  )
}

export default Leaderboard