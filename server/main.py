from fastapi import FastAPI
from controllers import graph_controller

app = FastAPI()

app.include_router(graph_controller.router)