def success(message, data):
    return {"success": True, "message": message, "data": data}


def error(message):
    return {"success": False, "message": message}
