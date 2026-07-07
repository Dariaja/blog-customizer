import { CSSProperties, useState } from 'react';

import clsx from 'clsx';

import { defaultArticleState } from 'src/constants/articleProps';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import styles from './app.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const [formState, setFormState] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={setFormState}
				onApply={() => setArticleState(formState)}
				onReset={() => {
					setFormState(defaultArticleState);
					setArticleState(defaultArticleState);
				}}
			/>
			<Article />
		</main>
	);
};
