import { useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	type ArticleStateType,
} from 'src/constants/articleProps';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	setFormState: Dispatch<SetStateAction<ArticleStateType>>;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formState,
	setFormState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

			<div ref={rootRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={(event) => {
							event.preventDefault();
							onApply();
							setIsOpen(false);
						}}
						onReset={() => {
							onReset();
						}}>
						<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
						<div className={styles.field}>
							<Select
								title='Шрифт'
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={(option) =>
									setFormState((prev) => ({
										...prev,
										fontFamilyOption: option,
									}))
								}
							/>
						</div>
						<div className={styles.field}>
							<RadioGroup
								name='font-size'
								title='Размер шрифта'
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={(option) =>
									setFormState((prev) => ({
										...prev,
										fontSizeOption: option,
									}))
								}
							/>
						</div>
						<div className={styles.field}>
							<Select
								title='Цвет шрифта'
								selected={formState.fontColor}
								options={fontColors}
								onChange={(option) =>
									setFormState((prev) => ({
										...prev,
										fontColor: option,
									}))
								}
							/>
						</div>

						<Separator />
						<div className={styles.field}>
							<Select
								title='Цвет фона'
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={(option) =>
									setFormState((prev) => ({
										...prev,
										backgroundColor: option,
									}))
								}
							/>
						</div>
						<div className={styles.field}>
							<Select
								title='Ширина контента'
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={(option) =>
									setFormState((prev) => ({
										...prev,
										contentWidth: option,
									}))
								}
							/>
						</div>
						<div className={styles.buttonsSpacer} />
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />

							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
