import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminPanel = () => {

    return (
        <div className="container">
            <Link to={'settings'}>
                <Button>Настройки</Button>
            </Link>

            <Link to='groups'>
                <Button>Группы</Button>
            </Link>
        </div>
    );
};

export default AdminPanel;
