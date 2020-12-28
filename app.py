from flask import Flask
from flask import render_template
from flask import request, jsonify, make_response
import mysql.connector
import json
import dbSQL as db

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('game.html')


@app.route('/new-room', methods=["POST"])
def new_room():
    parameters = request.get_json()
    id = db.send_parameters_sql(parameters)
    return ok(id)


@app.route("/id/<int:game_id>")
def open_gmae_id(game_id):
    return render_template('room.html')


@app.route("/id/<int:game_id>/create-new-table", methods=["POST"])
def create_new_table(game_id):
    active_player = request.get_json()
    parameter = db.read_game_data_sql(game_id)
    if active_player != "1" or active_player != "2":
        next_active = (parameter["Player"]) + 1
        db.update_player_number_sql(next_active, game_id)
        parameter = json.dumps(parameter)
        return ok(parameter)
    else:
        return ok([])


@app.route('/id/<int:game_id>/new-info-turn', methods=["POST"])
def new_info_turn(game_id):
    new_turn = request.get_json()
    last_turn = db.last_turn_sql(game_id)
    if last_turn != []:
        if new_turn['playerId'] > 2 or new_turn['playerId'] < 1:
            return ""
        last_turn = db.array_to_object(last_turn)
        if last_turn["playerId"] == new_turn['playerId']:
            return ""
    db.save_turn_data_sql(new_turn)
    return ok(new_turn)


@app.route('/id/<int:game_id>/is-there-a-victory', methods=["POST"])
def is_there_a_victory(game_id):
    array_victory_points = request.get_json()
    all_point = db.all_turn_sql(game_id)
    if db.victory_check(all_point, array_victory_points):
        return ok(array_victory_points)
    else:
        return ok([])


@app.route("/id/<int:game_id>/game-board-update")
def game_board_update(game_id):
    new_turn = db.next_turn_sql(game_id)
    if new_turn != []:
        new_turn = db.array_to_object(new_turn)
        new_turn = json.dumps(new_turn)
        return ok(new_turn)
    else:
        return ok([])


@app.route('/id/<int:game_id>/full-information-of-the-game')
def full_information_of_the_game(game_id):
    all_ture_array = db.all_turn_sql(game_id)
    if all_ture_array == []:
        return ok([])
    else:
        list = db.arranging_array_to_object(all_ture_array)
        return ok(list)


@app.route('/id/<int:game_id>/save-name-2', methods=["POST"])
def save_name2(game_id):
    player_name_2 = request.get_json()
    db.update_save_name_sql(player_name_2, game_id)
    return ok(player_name_2)


@app.route('/id/<int:game_id>/view-name-2')
def view_name_2(game_id):
    name2 = db.select_name_sql(game_id)
    return ok(name2)


def ok(data):
    OK_STATUS = 200
    return make_response(jsonify(data), OK_STATUS)


if __name__ == "__main__":
    app.run(port=4998)
    # app.run(host ='0.0.0.0')
