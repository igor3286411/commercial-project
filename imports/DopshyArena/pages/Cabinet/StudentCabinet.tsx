import React, { useState, useEffect } from "react";
import { CabinetRoute, getCabinetRoutesById } from "./cabinetData.ts";
import { useParams } from "react-router-dom";
import UserCabinet from "./UserCabinet.tsx";
import { useStudent } from "../../../helpers/hooks/useStudent.tsx";

const StudentCabinet = () => {
    const [currentCabinet, setCurrentCabinet] = useState<CabinetRoute | null>(null)

    const { id } = useParams();

    const { student, isStudentLoading } = useStudent(id);

    useEffect(() => {
        for (const cabinet of getCabinetRoutesById(student?.userId, 'children')) {
            setCurrentCabinet(cabinet)
        }
    }, [isStudentLoading])


    return (
        <div className='container'>
            {currentCabinet ? <UserCabinet buttons={currentCabinet.buttons} /> : <div>Загрузка...</div>}
        </div>
    )
}

export default StudentCabinet;