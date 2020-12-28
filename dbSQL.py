from flask import Flask
from flask import render_template
from flask import request, jsonify, make_response
import mysql.connector
import json
import datetime
import time

mydb = mysql.connector.connect(
    host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
    user="admin",
    password="Bc1b1dc11",
    database="four_in_a_row"
)
cursor = mydb.cursor()


def send_parameters_sql(parameters):
    sql = "INSERT INTO game (columnsG, rowsG, victoryScore, LastModifiedMounter, activePlayer, victory, name1) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = (parameters['columns'], parameters['rows'], parameters['victoryScore'],
           parameters['lastModifiedMounter'], parameters['Player'], parameters['victory'], parameters['name1'])
    cursor.execute(sql, val)
    mydb.commit()
    return cursor.lastrowid


def read_game_data_sql(idGame):
    sql = "SELECT * FROM game WHERE id = %s"
    val = (idGame,)
    cursor.execute(sql, val)
    data = cursor.fetchall()
    if data != []:
        parameter = {
            "id": data[0][0],
            "rows":  data[0][2],
            "columns": data[0][1],
            "victoryScore": data[0][3],
            "name1": data[0][8],
            "victory": data[0][7],
            "Player": data[0][6],
            "lastModifiedMounter": data[0][4]
        }
        return parameter


def update_player_number_sql(Player, id):
    sql = "UPDATE game SET activePlayer = %s WHERE id = %s"
    val = (Player, id)
    cursor.execute(sql, val)
    mydb.commit()


def last_turn_sql(idGame):
    cursor.execute(
        "SELECT * FROM QueueTabl WHERE idGame = %s  ORDER BY ID DESC LIMIT 1;", (idGame,))
    return cursor.fetchall()


def save_turn_data_sql(NewTurn):
    sql = "INSERT INTO QueueTabl (idGame, Player_id, tr, td, victory) VALUES (%s, %s, %s, %s, %s)"
    val = (NewTurn['id'], NewTurn['playerId'],
           NewTurn['tr'], NewTurn['td'], NewTurn['victory'])
    cursor.execute(sql, val)
    mydb.commit()


def all_turn_sql(idGame):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM QueueTabl WHERE idGame = %s ;", (idGame,))
    return cursor.fetchall()


def next_turn_sql(idGame):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    cursor = mydb.cursor()
    cursor.execute(
        "SELECT * FROM QueueTabl WHERE idGame = %s  ORDER BY ID DESC LIMIT 1;", (idGame,))
    return (cursor.fetchall())


def update_save_name_sql(name, idGame):
    sql = "UPDATE game SET name2 = %s WHERE id = %s"
    val = (name, idGame)
    cursor.execute(sql, val)
    mydb.commit()


def select_name_sql(idGame):
    mydb = mysql.connector.connect(
        host="four-in-a-row.cfvxrnptegvy.us-east-2.rds.amazonaws.com",
        user="admin",
        password="Bc1b1dc11",
        database="four_in_a_row"
    )
    cursor = mydb.cursor()
    sql = "SELECT name2 FROM game WHERE id = %s"
    val = (idGame,)
    cursor.execute(sql, val)
    name = cursor.fetchall()
    return name[0][0]


def victory_check(all_point, array_victory_points):
    point = []
    for x in all_point:
        y = []
        y.append(x[4])
        y.append(x[3])
        point.append(y)
    cunt = 0
    for x in point:
        if x in array_victory_points:
            cunt = cunt + 1
    return cunt == len(array_victory_points)


def array_to_object(array):
    new_turn = {
        "id": array[0][0],
        "gameId": array[0][1],
        "playerId": array[0][2],
        "tr": array[0][3],
        "td": array[0][4],
        "victory": array[0][5],
    }
    return new_turn


def arranging_array_to_object(all_ture_array):
    list = []
    for x in all_ture_array:
        turn_obj = {
            "id": x[0],
            "gameId": x[1],
            "playerId": x[2],
            "tr": x[3],
            "td": x[4],
            "victory": x[5],
        }
        list.append(turn_obj)
    return list
