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
                backgroundColor: index != 0 ? "#27ae60" : "#fff563",
                margin: 10,
                borderRadius: 10,
                justifyContent: "space-between",
                padding: 10,
                alignItems: "center",
            }}>
                <Text style={{
                    color: index != 0 ? "#fff" : "#000",
                    fontSize: 20,
                    fontWeight: "bold",
                }}>{`${person.username} ${index === 0 ? "👑" : ""}`}</Text>
                <Text style={{
                    color: index != 0 ? "#089e46" : "#000",
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