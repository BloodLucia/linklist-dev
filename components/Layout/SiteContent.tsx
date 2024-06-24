import Image from 'next/image'

export const SiteContent = () => {
  return (
    <main className="pt-[49px] overflow-y-auto overflow-x-hidden w-full">
      <div className="xl:max-w-6xl mx-auto max-md:w-full px-4 max-md:min-h-screen grid items-end max-md:grid-cols-1 grid-cols-2">
        <section className="flex flex-col justify-end max-md:justify-end gap-y-8 max-md:text-center h-full md:py-28">
          <div className="max-md:mb-8 flex flex-col">
            <h1 className="text-4xl font-semibold tracking-[1px]">
              为你的 link in bio 提供多个链接
            </h1>
            <h2 className="text-xl font-light mt-3">
              在 Instagram、TikTok、YouTube 上为你的 link in bio 注入强大动力.
            </h2>
          </div>
          <div className="grid max-md:grid-cols-1 gap-x-4 gap-y-3 grid-cols-2 md:mt-8 items-center">
            <a href="/signin/signup" className="ll-btn ll-btn-bg1 rounded-full">
              注册
            </a>
            <a
              href="/signin/password_signin"
              className="ll-btn ll-btn-bg2 rounded-full"
            >
              登录
            </a>
          </div>
        </section>
        <section className="w-full flex items-start justify-center max-md:pb-8">
          <Image
            src="/linklist-small.png"
            priority
            decoding="auto"
            loading="eager"
            width={525}
            height={482}
            alt="LinkList"
          />
        </section>
      </div>
    </main>
  )
}
