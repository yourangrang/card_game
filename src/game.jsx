import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './game.css';
import { cardImg } from '../src/data';
import { GrGamepad } from "react-icons/gr";
import { FiLoader } from "react-icons/fi";

const cardIcon = [
    { img: cardImg[1].img, matched: false },
    { img: cardImg[2].img, matched: false },
    { img: cardImg[3].img, matched: false },
    { img: cardImg[4].img, matched: false },
    { img: cardImg[5].img, matched: false },
    { img: cardImg[6].img, matched: false },
    { img: cardImg[7].img, matched: false },
    { img: cardImg[8].img, matched: false },
];

const Game = () => {
    // 게임 상태 관리
    const [card, setCard] = useState([]);
    const [turn, setTurn] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [loading, setLoading] = useState(true); 

    // 카드 섞기
    const shuffleCard = () => {
        const shuffledCards = [...cardIcon, ...cardIcon]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCard(shuffledCards);
        setGameWon(false);
        setTurn(0);
    };

    // 카드 선택 처리
    const handleChoice = (card) => {
        if (card === choiceOne || card === choiceTwo || card.matched) return;
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.img === choiceTwo.img) {
                setCard((prevCard) =>
                    prevCard.map((card) =>
                        card.img === choiceOne.img ? { ...card, matched: true } : card
                    )
                );
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    // 턴 리셋
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurn((prevTurn) => prevTurn + 1);
        setDisabled(false);
    };

    // 게임 시작 시 카드 섞기
    useEffect(() => {
        shuffleCard();
    }, []);

    // 게임 승리 확인
    useEffect(() => {
        if (card.length && card.every((card) => card.matched)) {
            setGameWon(true);
        }
    }, [card]);

    // 로딩
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
        
    }, []);
   

    return (
        <div className="game">
            {loading ? (
                <div className="loading">
                    <h1>게임 로딩 중 <FiLoader className='FiLoader'/></h1>
                </div>
            ) : (
                <>
                    <h1>카드 매칭게임<GrGamepad /></h1>
                    <button onClick={shuffleCard}>다시하기</button>
                    <div className="turn_wrap">
                        <p>턴: {turn}</p>
                    </div>
                    {gameWon && (
                        <motion.div
                            className="win_message"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            🎉YOU WIN!
                        </motion.div>
                    )}
                    <div className="card_grid">
                        {card.map((card) => (
                            <motion.div
                                key={card.id}
                                className={`card ${card.matched ? 'matched' : ''} `}
                                onClick={() => !disabled && handleChoice(card)}
                                initial={{ rotateY: 0 }}
                                animate={{
                                    rotateY: card === choiceOne || card === choiceTwo || card.matched ? 180 : 0,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="front">
                                    {card === choiceOne || card === choiceTwo || card.matched ? (
                                        <img src={card.img} alt="Card front" />
                                    ) : (
                                        <img src={cardImg[0].img} alt="Card back" style={{ width: '100%', height: '100%' }} />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;
