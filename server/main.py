from fastapi import FastAPI
from controllers import analytic_controller, investment_controller

app = FastAPI()

app.include_router(analytic_controller.router)
app.include_router(investment_controller.router)