const OddEvenResult = ({count}) => {
    return (
        <>
            <p>{count % 2 === 0 ? "짝수" : "홀수"}</p>
        </>
    );
}

export default OddEvenResult;