import axiosInstance from '@/shared/api/axios'

export interface NoticeUserModel {
  userId: number
  nickname: string
}

export interface NoticeModel {
  noticeId: number
  user: NoticeUserModel
  title: string
  content: string
  createdAt: string
}

interface NoticesResponseModel {
  isSuccess: boolean
  message: string
  result: {
    content: NoticeModel[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
}

interface Props {
  page?: number
  size?: number
}

const getNotices = async ({ page = 1, size = 9 }: Props = {}): Promise<
  NoticesResponseModel['result']
> => {
  try {
    const response = await axiosInstance.get<NoticesResponseModel>(
      `/api/notices?page=${page}&size=${size}`
    )
    return response.data.result
  } catch (err) {
    console.error(err)
    throw new Error('공지사항 목록 조회에 실패했습니다.')
  }
}

export default getNotices
