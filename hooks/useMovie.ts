import { MovieDetail, MovieGenresResponse, MovieReviewsResponse, PagedMovieList } from '@/interfaces/interfaces';
import { tmdbRequest } from "@/utils/request";
import { superbase } from '@/utils/superbaseClient';

const commonSearchParams = {
  include_adult: false,
  include_video: false,
  language: 'zh',
  sort_by: 'popularity.desc',
} as const;

interface ExtraQuery {
  with_keywords?: string,
  page?: number
}


// export const searchMovie = async (extraQuery: ExtraQuery): Promise<PagedMovieList> => {
//     const response = await tmdbRequest.get(`/discover/movie`, { params: {...commonSearchParams, ...extraQuery}});
//     return response;
// };

// export const searchMovieByKeywords = async (keywords: string): Promise<PagedMovieList> => {
//     return searchMovie({with_keywords : keywords, page: 1});
// };

export const getTopMovies = async (page: number = 1): Promise<PagedMovieList> => {
  const response = await tmdbRequest.get(`/discover/movie`, { params: { ...commonSearchParams, page: page } });
  return response;
};

export const searchMovie = async (query: string): Promise<PagedMovieList> => {
  const params = {
    query: encodeURIComponent(query),
    sort_by: 'popularity.desc',
    language: 'zh',
  };
  const response = await tmdbRequest.get(`search/movie`, { params });
  return response;
};

export const getMovieGenres = async (): Promise<MovieGenresResponse> => {
  const params = {
    language: 'zh'
  };
  const response = await tmdbRequest.get(`/genre/movie/list`, { params });
  return response;
};

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await tmdbRequest.get(`/movie/${id}`);
  return response;
};

export const fetchMovieReviews = async (id: number, page: number = 1): Promise<MovieReviewsResponse> => {
  const params = {
    language: 'en-US',
    page: page
  };
  const response = await tmdbRequest.get(`/movie/${id}/reviews`, { params });
  return response;
};


export const fetchSimilarMovies = async (id: number, page: number = 1): Promise<PagedMovieList> => {
  const params = {
    language: 'en-US',
    page: page
  };
  const response = await tmdbRequest.get(`/movie/${id}/similar`, { params });
  return response;
};

export const recordMovieView = async (id: number) => {
  //  const response = await supabase.from('movie_view')
  //  .upsert({ movie_id: id, bg_img_url: bgImgUrl, count: 1 })

  const response = await superbase.rpc('record_movie_view', {
    p_movie_id: id,
  })
  console.log('recordMovieView response:', response);
  return response;
};

export const getTrendingMovie = async (total: number=3): Promise<number[]> => {
  const {data, error} = await superbase.from('movie_view')
    .select('movie_id')
    .order('count', { ascending: false })
    .order('id', { ascending: false })
    .limit(total)
    .overrideTypes<{ movie_id: number }[]>()
  if (error) {
    console.error('获取热门电影失败:', error)
    throw error
  }
  return data?.map(row => row.movie_id) ?? []
};

export const fetchVideoUri = async (id: number): Promise<string | null> => {
  const response = await tmdbRequest.get(`/movie/${id}/videos`);
  const video = response.results.find((video: any) => video.type === 'Trailer');
  return video ? video.key : null;
};