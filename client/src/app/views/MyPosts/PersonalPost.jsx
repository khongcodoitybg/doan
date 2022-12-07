import ConstantList from '../../appConfig';

import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import EducationChart from './EducationChart';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import {
	Grid,
	Card,
	IconButton,
	Icon,
	Tooltip,
	Button,
} from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { Breadcrumb, EgretListItem1 } from 'egret';
import axios from 'axios';
import moment from 'moment';
import MaterialTable from 'material-table';

import './PersonalPost.scss';
import history from '../../../history';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getArticle, getArticleOfMe } from '../forum/ForumService';
import { Component } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

class Forum extends Component {
	state = { postList: [] };

	async componentDidMount() {
		getArticleOfMe()
			.then((res) => {
				console.log(res);
				res && res.data && this.setState({ postList: res.data.data.reverse() });
			})
			.catch((e) => console.log(e));
		document.querySelector('.scrollable-content').scrollTo({ top: 0, left: 0 });
	}

	handleClickCreateTopic = () => {
		history.push(ConstantList.ROOT_PATH + 'page-layouts/created');
	};

	handleClickCreatePost = () => {
		history.push(ConstantList.ROOT_PATH + 'page-layouts/created');
	};
	handleClickShowPost = (id) => {
		history.push(ConstantList.ROOT_PATH + `page-layouts/post-detail/:${id}`);
	};
	convert = (data) => {
		{
			switch (data) {
				case '1':
					return 'học tập';
					break;

				case '2':
					return 'giải trí';
					break;
				case '3':
					return 'ngoại ngữ';
					break;
				case '4':
					return 'tài liệu';
					break;

				case '5':
					return 'đời sống';
					break;
			}
		}
	};
	render() {
		let { t, i18n } = this.props;
		const data = [
			{ name: t('study corner'), value: 400 },
			{ name: t('entertainment corner'), value: 300 },
			{ name: t('foreign language corner'), value: 300 },
			{ name: t('document corner'), value: 200 },
			{ name: t('life corner'), value: 200 },
		];
		return (
			<div className="learning-management m-sm-30">
				<div className="mb-sm-30 navForum">
					<Breadcrumb routeSegments={[{ name: t('personal') }]} />

					<div>
						<Button
							variant="contained"
							className="createButton"
							startIcon={<EditIcon />}
							onClick={() => {
								this.handleClickCreateTopic();
							}}>
							{t('post')}
						</Button>
					</div>
				</div>
				<Grid
					container
					spacing={3}>
					<Grid
						item
						lg={8}
						md={8}
						sm={12}
						xs={12}>
						<Card
							elevation={6}
							className="mb-24">
							{/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
							<div className="overflow-auto">
								<Grid xs={12}>
									<MaterialTable
										title={t('myPost')}
										data={this.state.postList}
										columns={[
											{
												field: 'title',
												title: t('title'),
												cellStyle: { width: '40%', minWidth: '40%' },
												headerStyle: {
													width: '40%',
													minWidth: '40%',
												},
											},
											{
												field: 'createdDate',
												title: t('timePost'),

												cellStyle: {
													width: '25%',
													minWidth: '25%',
													textAlign: 'center',
												},
												headerStyle: {
													textAlign: 'right',
													width: '25%',
													minWidth: '25%',
													whiteSpace: 'nowrap',
												},
												render: (rowData) => (
													<>
														<p
															style={{
																display: 'flex',
																justifyContent: 'center',
																marginBottom: '0',
															}}>
															{moment(rowData.createdDate).format('DD/MM/YYYY')}
														</p>
													</>
												),
											},
											{
												field: 'category',
												title: t('category'),

												cellStyle: { width: '20%', minWidth: '20%' },
												headerStyle: {
													width: '20%',
													minWidth: '20%',
												},
												render: (rowData) => (
													<>
														<p
															style={{
																display: 'flex',
																justifyContent: 'center',
																marginBottom: '0',
															}}>
															{this.convert(rowData.category)}
														</p>
													</>
												),
											},
											{
												align: 'right',
												field: 'viewCount',
												title: t('viewCount'),
												cellStyle: {
													width: '10%',
													minWidth: '10%',
													textAlign: 'center',
												},
												headerStyle: {
													textAlign: 'right',
													width: '10%',
													minWidth: '10%',
												},
												render: (rowData) => (
													<>
														<span>
															<p style={{ display: 'flex', marginBottom: '0' }}>
																<Icon
																	fontSize="small"
																	color="primary">
																	visibility
																</Icon>
																{rowData.viewCount}
															</p>
														</span>
													</>
												),
											},
										]}
										options={{
											selection: false,
											paging: true,
											search: true,

											rowStyle: (rowData, index) => ({
												backgroundColor: index % 2 === 1 ? '#EEE' : '#FFF',
											}),
											headerStyle: {
												backgroundColor: '#EFC050',
												color: '#fff',
											},

											toolbar: true,
										}}
										onRowClick={(event, rowData) => {
											this.handleClickShowPost(rowData.id);
										}}
										localization={{
											body: {
												emptyDataSourceMessage: 'No data',
											},
										}}
									/>
								</Grid>
							</div>
						</Card>

						<Card
							style={{ marginTop: '100px' }}
							elevation={6}
							className="mb-24">
							<EducationChart height="400px"></EducationChart>
						</Card>
					</Grid>

					<Grid
						item
						lg={4}
						md={4}
						sm={12}
						xs={12}>
						<Card
							elevation={6}
							className="p-sm-24 h-100">
							<Card
								elevation={0}
								className="upgrade-card bg-light-primary p-sm-24 mb-36">
								<img
									src={
										ConstantList.ROOT_PATH +
										'assets/images/illustrations/upgrade.svg'
									}
									alt="upgrade"
								/>
								<p className="text-muted m-0 py-24">{t('never give up')}</p>
							</Card>

							<div className="mb-36">
								<h5 className="mb-16 font-size-14 font-weight-600 text-hint">
									Achievements
								</h5>
								<div className="flex flex-middle">
									<Tooltip
										title="Completed first course"
										placement="top">
										<img
											src={
												ConstantList.ROOT_PATH +
												'assets/images/badges/badge-1.svg'
											}
											alt="badge"
											height="24px"
										/>
									</Tooltip>
									<Tooltip
										title="Won a challenge"
										placement="top">
										<img
											className="mx-24"
											src={
												ConstantList.ROOT_PATH +
												'assets/images/badges/badge-2.svg'
											}
											alt="badge"
											height="24px"
										/>
									</Tooltip>
									<Tooltip
										title="Won a competition"
										placement="top">
										<img
											src={
												ConstantList.ROOT_PATH +
												'assets/images/badges/badge-3.svg'
											}
											alt="badge"
											height="24px"
										/>
									</Tooltip>
								</div>
							</div>

							<div className="">
								<h5 className="mb-8 font-size-14 font-weight-600 text-hint">
									{t('forum statistic')}
								</h5>
								<EgretListItem1
									title={t('number of members')}
									subtitle="2606"
									bulletIcon="web"
									iconColor="error"
									actionIcon="play_circle_outline"></EgretListItem1>

								<EgretListItem1
									title={t('online')}
									subtitle="2000"
									bulletIcon="list_alt"
									iconColor="primary"
									actionIcon="play_circle_outline"></EgretListItem1>

								<EgretListItem1
									title={t('number of posts')}
									subtitle="2022"
									bulletIcon="description"
									iconColor="secondary"
									actionIcon="play_circle_outline"></EgretListItem1>
							</div>

							<Card
								style={{
									marginTop: '100px',
									display: 'flex',
									justifyContent: 'center',
								}}
								elevation={0}
								className="upgrade-card bg-light-primary p-sm-24 mb-36">
								<div className="pie">
									<PieChart
										width={400}
										height={400}>
										<Pie
											data={data}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={renderCustomizedLabel}
											outerRadius={80}
											fill="#8884d8"
											dataKey="value">
											{data.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Legend
											iconSize={10}
											layout="vertical"
											verticalAlign="top"
										/>
									</PieChart>
								</div>
							</Card>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default Forum;
