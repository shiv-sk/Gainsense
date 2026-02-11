from fastapi import FastAPI
from controllers import analytic_controller, investment_controller
from database import Base , engine
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool

@asynccontextmanager
async def lifespan(app: FastAPI):
    await run_in_threadpool(Base.metadata.create_all, bind=engine)
    print("Database connected & tables ensured")
    yield
    engine.dispose()
app = FastAPI(lifespan = lifespan)

origins = ["http://localhost:3000", "https://gainsense.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytic_controller.router)
app.include_router(investment_controller.router)