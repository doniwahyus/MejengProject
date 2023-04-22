import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

export const createProject = createAsyncThunk(
	'project/create',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;

		try {
			const response = await api.post('/api/project/create-project', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: token,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getProfile = createAsyncThunk(
	'user/getProfile',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		try {
			const response = await api.get('/api/user/profile', {
				headers: {
					Authorization: token,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateProfile = createAsyncThunk(
	'user/updateProfile',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		const { name, region, country, desc, user_image } = payload;
		try {
			const response = await api.put(
				'/api/user/update-profile',
				{
					name,
					region,
					country,
					desc,
					user_image,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: token,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const requestCreator = createAsyncThunk(
	'auth/requestCreator',
	async (payload, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		try {
			const response = await api.post(
				'/api/creators/request',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const activateCreator = createAsyncThunk(
	'auth/activateCreator',
	async (payload, { rejectWithValue }) => {
		const { token } = payload;
		try {
			const response = await api.get(`/api/creators/activate/${token}`, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getIpAddress = createAsyncThunk(
	'auth/getIpAddress',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await api.get('https://api.ipify.org?format=json');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);