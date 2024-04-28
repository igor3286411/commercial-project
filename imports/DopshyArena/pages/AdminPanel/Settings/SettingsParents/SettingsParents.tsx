import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


const SettingsParents = () => {


    return (
        <div className="settings">
            <Link to='create'>
                <Button>Создать родителя и ребенка</Button>
            </Link>
            <Link to='add'>
                <Button>Добавить ребенка родителю</Button>
            </Link>
        </div>
    )

}

export default SettingsParents;