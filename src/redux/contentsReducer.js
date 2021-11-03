import { 
	UPLOAD_MOVIES_FAVORITE,
	REMOVE_MOVIES_FAVORITE,
	FETCH_MOVIES_NOW_PLAYING,
	FETCH_MOVIES_POPULAR, 
	FETCH_MOVIES_SEARCH, 
	FETCH_MOVIES_TOP_RATED, 
	FETCH_MOVIES_UPCOMING,
	FETCH_TV_TOP_RATED,
	FETCH_TV_POPULAR,
	FETCH_TV_SEASONS} from "./types";

const initialState = {
	// all in action.js
	contents: {
		now_playing: {
			title: 'Now Playing',
			typeContent: 'movie',
			categoryUrl: 'now_playing',
			category: 'now_playing',
			type: FETCH_MOVIES_NOW_PLAYING,
			data: [],
		},
		popular: {
			title: 'Popular',
			typeContent: 'movie',
			categoryUrl: 'popular',
			category: 'popular',
			type: FETCH_MOVIES_POPULAR,
			data: [],
		},
		top_rated: {
			title: 'Top Rated',
			typeContent: 'movie',
			categoryUrl: 'top_rated',
			category: 'top_rated',
			type: FETCH_MOVIES_TOP_RATED,
			data: [],
		},
		upcoming: {
			title: 'Upcoming',
			typeContent: 'movie',
			categoryUrl: 'upcoming',
			category: 'upcoming',
			type: FETCH_MOVIES_UPCOMING,
			data: [],
		},
		top_rated_tv: {
			title: 'Top Rated TV',
			typeContent: 'tv',
			categoryUrl: 'top_rated_tv',
			category: 'top_rated',
			type: FETCH_TV_TOP_RATED,
			data: [],
		},
		popular_tv: {
			title: 'Popular TV',
			typeContent: 'tv',
			categoryUrl: 'popular_tv',
			category: 'popular',
			type: FETCH_TV_POPULAR,
			data: [],
		},
	},
	favorite: [],
	search: {},
	searchSeasons: [],
};
let arr = [];
function getUniqueListBy(arr) {
   return [...new Map(arr.map(item => [item.id, item])).values()]
}

const contentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIES_NOW_PLAYING:
			arr = [...state.contents.now_playing.data, ...action.payload];
			return {...state, 
				contents: {...state.contents, now_playing: {...state.contents.now_playing, data: getUniqueListBy(arr)}} 
			}
		case FETCH_MOVIES_POPULAR:
			arr = [...state.contents.popular.data, ...action.payload];
			return {...state, 
				contents: {...state.contents, popular: {...state.contents.popular, data: getUniqueListBy(arr)}} 
			}
		case FETCH_MOVIES_TOP_RATED:
			arr = [...state.contents.top_rated.data, ...action.payload];
			return {...state, 
				contents: {...state.contents, top_rated: {...state.contents.top_rated, data: getUniqueListBy(arr)}} 
			}
		case FETCH_MOVIES_UPCOMING:
			arr = [...state.contents.upcoming.data, ...action.payload];
			return {...state, 
				contents: {...state.contents, upcoming: {...state.contents.upcoming, data: getUniqueListBy(arr)}} 
			}
		case FETCH_TV_TOP_RATED:
			arr = [...state.contents.top_rated_tv.data, ...action.payload];
			return {...state, 
				contents: {...state.contents, top_rated_tv: {...state.contents.top_rated_tv, data: getUniqueListBy(arr)}} 
			}
		case FETCH_TV_POPULAR:
			arr = [...state.contents.popular_tv.data, ...action.payload];
			return {...state, 
				contents: {...state.contents, popular_tv: {...state.contents.popular_tv, data: getUniqueListBy(arr)}} 
			}
		case UPLOAD_MOVIES_FAVORITE:
			return {...state, favorite: [...state.favorite, ...action.payload]}
		case REMOVE_MOVIES_FAVORITE:
			let newFavorite = state.favorite.filter(x => x.id !== action.payload.id);
			return {...state, favorite: newFavorite}
		case FETCH_MOVIES_SEARCH:
			return {...state, search: action.payload}
		case FETCH_TV_SEASONS:
			return {...state, searchSeasons: action.payload}
		default:
			return state
	}
}
 
export default contentsReducer;