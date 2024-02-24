import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

const GRID_SIZE = 3;

const generateBoard = (size) => {
    const newBoard = [];
    for (let ctr = 0; ctr < size; ctr++) {
        newBoard.push(Array(size));
    }
    return newBoard;
}

const rowsToCols = (board) => {
    const newBoard = []
    let column = 0;
    while (column < board.length) {
        const newRow = []
        for (let row = 0; row < board.length; row++) {
            newRow.push(board[row][column])
        }
        newBoard.push(newRow);
        column++;
    }
    return newBoard;
}

const getDiagonal = (board) => {
    const newBoard = []
    const diag1 = []
    const diag2 = []
    for (let ctr = 0; ctr < board.length; ctr++) {
        diag1.push(board[ctr][ctr]);
        diag2.push(board[(board.length-1)-ctr][ctr]);
    }
    newBoard.push(diag1);
    newBoard.push(diag2);
    return newBoard;
}

const checkHorizontal = (board) => {
    for (let row of board) {
        const rowSet = new Set(row);
        if (rowSet.size == 1 && !rowSet.has(undefined)) {
            return true;
        }
    }
}


const checkForWin = (board) => {
    if(checkHorizontal(board)) { // horizontal
        return true
    } else if (checkHorizontal(rowsToCols(board))) { // vertical
        return true
    } else if (checkHorizontal(getDiagonal(board))) { // diagonal
        return true
    }
}


const Grid = ({ theme, light, dark }) => {
    const [board, setBoard] = useState(generateBoard(GRID_SIZE));
    const [player, setPlayer] = useState('🍑');
    const [status, setStatus] = useState(`🍑's turn`)
    const [playable, setPlayable] = useState(false)

    const reset = () => {
        setBoard(generateBoard(GRID_SIZE));
        setPlayer('🍑');
        setStatus(`🍑's turn`);
        setPlayable(false)
    }

    const handleClick = (r, c) => {
        if (board[r][c] === undefined) {
            board[r][c] = player;
            setPlayer(player === '🍑' ? '🍆' : '🍑');
            setStatus(`${player === '🍑' ? '🍆' : '🍑'}'s turn`)
        };
        if (checkForWin(board)) {
            setStatus(`${player} Wins`);
            setPlayable(true)

        }
    }



    const styles = StyleSheet.create({
        playGrid: {
            alignItems: 'center',
            justifyContent: 'center',
            margin: 2,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 100,
            maxHeight: 100,
            display: 'flex',
            padding: 0,
            borderWidth: 1.5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderColor: theme == true ? light : dark,
            backgroundColor: theme === true ? dark : light,
        },
        textStyle: {
            fontSize: 20,
            marginTop: 50,
            color: theme === true ? light : dark
        },
        viewStyle: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
        },
        statusColor: theme === true ? light : dark,
        buttonColor: theme === true ? dark : light
    })



    return (
        <View style={styles.viewStyle}>
            <TouchableOpacity onPress={() => {reset()}}>
                <Button buttonColor={styles.buttonColor} textColor={styles.textStyle.color} mode={'contained'} style={{ marginTop: 10, borderRadius: '10px' }}>Reset</Button>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 1, maxHeight: 320, marginTop: 20 }}>
                <FlatList scrollEnabled={false} data={board} renderItem={({ item: row, index: r }) => {
                    return (
                        <FlatList style={{ flexDirection: 'row', justifyContent: 'center' }} data={row} renderItem={({ index: c }) => {
                            return (
                                <TouchableOpacity disabled={playable} onPress={() => handleClick(r, c)}>
                                    <View style={styles.playGrid}>
                                        <Text style={{ color: theme === true ? light : dark, fontSize: 50 }}>{board[r][c]}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}>
                        </FlatList>
                    )
                }} >
                </FlatList>
            </View>
            <View alignItems={'center'}>
                <Text style={{ marginTop: 20, fontSize: 15, fontWeight: 'bold', color: styles.textStyle.color }}>{status}</Text>
            </View>
        </View>
    )
}

export default Grid;