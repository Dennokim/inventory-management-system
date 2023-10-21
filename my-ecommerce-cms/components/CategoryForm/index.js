import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import FormCategorySection from './section';

const CategoryForm = ({ type, defaultValues, onFormSubmit, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (defaultValues) {
      setValue('name', defaultValues.name);
    }
  }, [defaultValues, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data);
    reset();
  });

  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <FormCategorySection defaultOpen={true} title={'Category Information'}>
          <Input
            name="name"
            label="Name of the Category"
            placeholder="My beautiful category..."
            type="text"
            error={errors.name ? errors.name.message : false}
            register={register('name', {
              required: {
                value: true,
                message: 'You must add the name of your category.',
              },
            })}
          />
        </FormCategorySection>
      </form>
      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Category` : 'Submit'}
      </Button>
    </div>
  );
};

export default CategoryForm;
