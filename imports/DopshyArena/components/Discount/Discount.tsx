import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface IDiscountProps {
    onCalculate: (result: number) => void;
}

const Discount: React.FC<IDiscountProps> = ({ onCalculate }) => {
    const [price, setPrice] = useState<number | "">(0);
    const [discount, setDiscount] = useState<number | "">(0);

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setPrice(isNaN(value) ? "" : value);
    };

    const handleChangeDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setDiscount(isNaN(value) ? "" : value);
    };

    function calculatePercentage(price: number | "", percentage: number | "") {
        if (typeof price === 'number' && typeof percentage === 'number') {
            return price - (price * percentage) / 100;
        } else {
            return price;
        }
    }

    //@ts-ignore
    onCalculate(calculatePercentage(price, discount));

    return (
        <div>
            <Form.Label htmlFor="price">Цена</Form.Label>
            <Form.Control type="number" value={price === 0 ? "" : price} onChange={handleChangePrice} />

            <Form.Label htmlFor="discount">Скидка</Form.Label>
            <Form.Control type="number" value={discount === 0 ? "" : discount} onChange={handleChangeDiscount} />

            <Form.Label htmlFor="result">Результат</Form.Label>
            <div>{calculatePercentage(price, discount)}</div>
        </div>
    );
};

export default Discount;
