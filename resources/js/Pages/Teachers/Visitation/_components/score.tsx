
interface ScoreProps {
    component_max_score: number;
    total_score: number;
    final_score: {
        evaluate: string;
        final_score: number;
    }
}

export const Score = ({component_max_score, total_score, final_score}: ScoreProps) => {
    return (
        <div className="rounded p-4 border">
            <h1 className="font-bold">NILAI AKHIR</h1>
            <table className="mt-4">
                <tbody>
                <tr>
                    <td>Skor perolehan : {total_score}</td>
                </tr>
                <tr>
                    <td>Skor maksimal : {component_max_score}</td>
                </tr>
                <tr>
                    <td>Hasil : {final_score.final_score}% ({final_score.evaluate})</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
