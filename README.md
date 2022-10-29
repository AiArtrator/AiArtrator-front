# P-O-G (Project of Generative model)

인공지능 모델 구매 및 판매 플랫폼

- ML서버로 모델 이용 가능 (GPU 없이 모델을 통한 이미지 생성이 가능합니다. )
- 모델 Run / 모델 공유 / 모델 구독 등이 가능합니다.
- 사업자 등록후 모델 매매 기능 업데이트 예정입니다.

---

# Ai Artrator (Project of Generative model, which is a platform to share/sell/purchase the ML models and run them on cloud API. )

## Inspiration

Nowadays, two-sided C2C markets allow any end users to sell diverse products that match eatch other. YouTube allows all the users to monetize their contents through universal channels. Beauty of such
market system is ever more growing, such as eBay, Soundcloud, Twitch, Amazon, Steam, and so much more. Yet no similar shift is shown in the Machine Learning communities. Researchers and developers that are working on ML models cannot easily profit from them unless they have lots of skills and practices.

Interestingly, with so many open source applications, any developers and researchers can build commercialisable - ML based applications. There are countless examples that are built by the community. But they are very difficult for people with unexperienced software engineering. There are some examples that are statically hosted, but that requires edge user's device to accelerate on.

In short, there are two sided problems.

1. Researchers/developers (individual or as a team) often cannot monetize on their research product very easily.
2. End users often have very difficult time installing, setting up the environment, or simply do not have the infrastructure to run the models.

Can Ai Artrator solve these problems? Yes.

## What it does

We have developed a platform that allows researchers/developers to monetize their Generative models (in ONNX format), and on the other side, end users can very easily purchase the model outputs from the models they like.

## How we built it

We have first splited the backend server with model hosting server, so that later can be dynamically scaled through cloud services. ML api server can than be using local EFS to store the models, which can be shared if there are too many requests.
Serving the model is simply serving the inference session by retrieving the model from the database (s3 in our case), and running with device acceleration, and returning the results.

We've devloped the website as a SPA, using frontend frameworks such as `React JS` with `styled components` We've utilized `firebase` backend with `expressjs`, and `Postgres` server with `s3` storage as databases. ML api server was developed with `FastAPI`.

## Challenges we ran into

Our main challenge was the design choice within the backend server and ML server. Initially, we thought directly pushing the model weights from user to ML server is the efficient one, but later we realized that verification middlewares had to happen through the backend server. As an end result, backend iteratively requesting inference sessions was the cleanest way to go, both in SRP and DI perspective.

## Accomplishments that we're proud of

As there were many implementations that were needed to make the software usable, we are very proud to develop the ones that are needed in time, with great quality. Also as a team, we've communicated both very efficiently and effectively that we could spend most of our time on developments. Overall, the end results were very usable and clean.

## What we learned

We have leant to use many open source frameworks and tools that we otherwise wouldn't have, such as docker, FastAPI, onnxruntimes and many others.
We also had a great chance to learn various MSA design choices and principles.
To also actually supply the website with models, we also needed to train bunch of GAN models from scratch, which, to do it efficiently we learned a lot from.

## What's next for Ai Artrator

To successfully deploy the model we need to have various other services that aren't in the app yet.
First one that is crucial yet unimplemented is model verification, such as checking various aspects of the models to decide rather they are deployable, such as

- Do they have a possibility to be misused? (e.g., deepfakes, NSFW models, harmful contents in general)
- Are they directly violating copyright licenses?
- Are they runnable on our standard devices efficiently? (e.g., without infinite loops?)
  ... and many others.

There are also other measures needed to be taken to further make the overall pipeline more efficient, such as utilizing batch-inference (along with reverse-proxying architecture) further hardware acceleration, and in-memory model caching.

With a bigger picture in mind, Ai Artrator can expend indefinitely. Onnx is a great tool to package many ML models, but they are nowhere exhaustive. To monetize the models very easily, we can further create our own universal ML framework that works on-par with ONNX but is more flexible, such as using outbound queries (to utilize other sources safely), similarity based database systems. Our platform can also be expended to non-ML use cases as well, as any kind of tensor operations can work here, non-ML applications (e.g., as widely used [EBsynth](https://ebsynth.com/) can also be applied here.
