from fastapi import FastAPI
from controllers import analytic_controller, investment_controller
from database import Base , engine
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield
    engine.dispose()
app = FastAPI(lifespan = lifespan)

app.include_router(analytic_controller.router)
app.include_router(investment_controller.router)