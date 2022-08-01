const MyHeader = ({headText, leftBtn, rightBtn}) =>{
    return (
        <header>
            <div className="head_btn_left">{leftBtn}</div>
            <div className="head_text">{headText}</div>
            <div className="head_btn_right">{rightBtn}</div>
        </header>
    )
};

export default MyHeader;