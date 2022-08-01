const MyButton = ({text, type, onClick}) => {
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
    const MyBtnText = text ? text : btnType == 'positive' ? '등록' : btnType == 'negative' ? '삭제' : '확인';

    return (
        <button onClick={onClick} className={['MyButton', `MyButton_${btnType}`].join(' ')}> {MyBtnText}</button>
    )
};
MyButton.defaultProps = {
    type : 'default',
}
export default MyButton;