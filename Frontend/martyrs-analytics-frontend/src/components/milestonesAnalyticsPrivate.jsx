import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState, useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { Bar } from 'react-chartjs-2';
import { getMilestonesReachedByUser, getUserCharacters } from "../services/analytics";

export const MilestonesAnalyticsPrivate = () => {
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState({});
    const [characters, setCharacters] = useState([]);
    const [chartType, setChartType] = useState("Zones");

    useEffect(() => {
        const getCharacters = async () => {
            const retrievedCharacters = await getUserCharacters();
            setCharacters(retrievedCharacters);
            await updateChartWithCharacterInfo(retrievedCharacters[0].id);
        }
        getCharacters();
    }, []);

    const updateChartWithCharacterInfo = async (characterId) => {
        const milestonesReached = await getMilestonesReachedByUser(characterId, chartType)
        const retrievedLabels = [];
        const retrievedData = [];
        for (let i = 0; i < milestonesReached.length; i++) {
            retrievedLabels.push(milestonesReached[i].name);
            retrievedData.push(milestonesReached[i].reached ? 1 : 0);
        }
        setLabels(retrievedLabels)
        setData(retrievedData);
    }

    const makeCharacterButton = (data) => {
        return (
            <button
                key={"character-button-" + data.id}
                onClick={() => clickCharacterButton(data.id)}
            >
                {data.name}
            </button>
        )
    }

    const clickCharacterButton = (id) => {
        updateChart(id);
    }

    const onClickMilestonesButton = (type) => {
        setChartType(type);
        updateChart();
    }

    return (
        <>
            <section id="character-button-container">
                {characters.map(makeCharacterButton, this)}
            </section>
            <section id="milestone-selector">
                <button id="zone-button" onClick={() => onClickMilestonesButton("Zone")}>Zone</button>
                <button id="bosses-button" onClick={() => onClickMilestonesButton("Boss")}>Bosses</button>
                <button id="unique-items-button" onClick={() => onClickMilestonesButton("Unique Item")}>Unique Items</button>
            </section>
            <section id="milestones-reached-bar">
                <Bar
                    options={{
                        indexAxis: 'y',
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'left'
                            },
                            title: {
                                display: true,
                                text: 'Enemy Kills'
                            }
                        }
                    }}
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Enemy Kills',
                                data: data,
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }
                        ]
                    }}
                >
                </Bar>
            </section>
        </>
    )
}