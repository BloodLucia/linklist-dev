'use client'

import styled from 'styled-components'

const AvatarBg = styled.div`
  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-image: url(https://ugc.production.linktr.ee/hQla6hgVQeeKYmZxRmgP_WR03z79kX0E2zipJ?io=true&size=avatar-v1_0);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    opacity: 0.25;
    filter: blur(50px);
  }

  &::after {
    content: '';
    position: fixed;
    width: 100%;
    top: 0px;
    height: 100%;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgNTEyIDUxMicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz4KICA8ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+CiAgICA8ZmVUdXJidWxlbmNlIAogICAgICB0eXBlPSdmcmFjdGFsTm9pc2UnIAogICAgICBiYXNlRnJlcXVlbmN5PScwLjcnCiAgICAgIG51bU9jdGF2ZXM9JzMnIAogICAgICBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+CiAgICA8ZmVDb2xvck1hdHJpeCBpbj0idHVyYnVsZW5jZSIgdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPgoKICAgIDxmZUNvbXBvbmVudFRyYW5zZmVyPgogICAgICA8ZmVGdW5jUiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIgLz4KICAgICAgPGZlRnVuY0cgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDEiIC8+CiAgICAgIDxmZUZ1bmNCIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAxIiAvPgogICAgPC9mZUNvbXBvbmVudFRyYW5zZmVyPgogIDwvZmlsdGVyPgogIAogIDxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZUZpbHRlciknLz4KPC9zdmc+);
    background-size: 512px 512px;
    background-repeat: repeat;
    opacity: 0.04;
    mix-blend-mode: overlay;
  }
`

const LinkItem = styled.div`
  z-index: 0;
  overflow: hidden;
  margin-bottom: 16px;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgb(255, 255, 255);
  transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
  box-shadow: rgba(10, 11, 13, 0.08) 0px 2px 4px 0px;
  border-radius: 4px;
  > a {
    hyphens: auto;
    white-space: normal;
    background: none;
    color: inherit;
    transition: box-shadow 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
      border-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
      transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
      background-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
    overflow-wrap: break-word;
    word-break: break-word;
    padding-left: 66px;
    padding-right: 66px;
    min-height: 64px !important;
    margin: 0px;
    border: none;
    font-family: inherit;
    font-weight: inherit;
    font-size: inherit;
    text-align: center;
    cursor: pointer;
    background: none;
    text-decoration: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: auto;
    position: relative;
    padding: 16px 20px;
    width: 100%;
    appearance: none;
    box-sizing: border-box;
    vertical-align: middle;
  }
`

const TopBarWrap = styled.div`
  display: grid;
  width: calc(100% - 24px);
  left: 0px;
  right: 0px;
  grid-template-columns: 1fr auto 1fr;
  border: 1px solid rgb(235, 238, 241);
  border-radius: 72px;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 150ms ease 0s, -webkit-transform 150ms ease 0s,
    -webkit-backdrop-filter 150ms ease 0s;
  backdrop-filter: blur(10px);
  @media (min-width: 576px) {
    padding-right: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

export default function Page() {
  return (
    <>
      {/* <TopBarWrap></TopBarWrap> */}
      <div className="min-h-dvh relative flex flex-col overflow-x-hidden w-full h-full">
        <style></style>
        <div className="flex justify-between flex-col flex-1 pt-16 px-4 max-sm:pb-16 w-full h-full">
          <div className="mx-auto h-full w-full max-w-xl align-baseline">
            <div className="min-h-dvh fixed inset-0 -z-10 bg-center bg-cover bg-no-repeat bg-black"></div>
            <div className="fixed inset-0 -z-10">
              <div className="w-full h-full relative">
                <AvatarBg />
              </div>
            </div>
            <div className="flex flex-col items-center">
              {/* 头像 */}
              <div
                className="mb-4 w-[96px] h-[96px] rounded-full overflow-hidden bg-primary object-contain"
                id="profile-picture"
              ></div>
              {/* 名称 */}
              <div className="flex items-center mx-3 max-w-full">
                <h1 className="text-ellipsis text-lg leading-[1.5] font-bold text-white">
                  @LinkListOfficial
                </h1>
              </div>
              {/* 介绍 */}
              <div className="px-10 mt-[2px]">
                <h2 className="text-center text-white/60 leading-[1.5] font-medium text-sm">
                  成立於寒冷ㄉ青春期，在萬芳小窩秘密創作中！
                </h2>
              </div>
            </div>
            <div className="mt-8">
              <div className="relative">
                <LinkItem className="relative h-auto"></LinkItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
