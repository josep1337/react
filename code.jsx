# react
import React, { useState, useEffect } from "react";

const GRID_SIZE = 20;

const getRandomGridPosition = () => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
};

const Snake = () => {
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 11, y: 10 },
  ]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(getRandomGridPosition());

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(interval);
  }, [snake]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + (direction === "RIGHT" ? 1 : direction === "LEFT" ? -1 : 0),
      y: newSnake[0].y + (direction === "DOWN" ? 1 : direction === "UP" ? -1 : 0),
    };
    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setFood(getRandomGridPosition());
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  };

  const handleKeyDown = (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 37 && direction !== "RIGHT") {
      setDirection("LEFT");
    } else if (keyCode === 38 && direction !== "DOWN") {
      setDirection("UP");
    } else if (keyCode === 39 && direction !== "LEFT") {
      setDirection("RIGHT");
    } else if (keyCode === 40 && direction !== "UP") {
      setDirection("DOWN");
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      {Array.from({ length: GRID_SIZE }).map((_, row) => (
        <div key={row} className="row">
          {Array.from({ length: GRID_SIZE }).map((_, col) => {
            const isSnake = snake.some((pos) => pos.x === col + 1 && pos.y === row + 1);
            const isFood = food.x === col + 1 && food.y === row + 1;
            return (
              <div
                key={col}
                className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Snake;
