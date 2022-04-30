import React from "react";
const LoadingScreen = ({showLoading}) => {

    return (
    <div className={`${!showLoading ? "active" : ""} show` }>
        <form>
            <input type="submit" value="NULL" />
        </form>
    </div>
    );
}

export default LoadingScreen;