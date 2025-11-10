'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, SubmitHandler, useForm, useFormReturn, FieldValues, Path } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z, ZodType } from "zod";
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import ImageUpload from './ImageUpload'
import { toast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'



interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data : T) => Promise<{success : boolean; error? : string}>;
  type: "SIGN_IN" | "SIGN_UP";
} 


const AuthForm = <T extends FieldValues>( { 
  type, 
  schema, 
  defaultValues, 
  onSubmit,
 } : Props<T>) => {
  
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();

  const form : useFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })
 
  
  const handleSubmit  : SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: 'Success',
        description: isSignIn ? 'Вы успешно вошли в свой аккаунт.' : 
        'Вы успешно зарегистрировались в Bookwise.'
      });

      router.push("/");
    }
    else {
      toast({
        title: `Ошибка ${isSignIn ? "входа в аккаунт." : "регистрации."}`,
        description: result.error ?? "Пожалуйста, попробуйте ещё раз.",
        variant: "destructive",
      })
    }
  };

  

  return ( 
     <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Добро пожаловать в Bookwise" : "Создать Bookwise аккаунт"}
      </h1>
      <p className='text-light-100'>
        {isSignIn ? "Открой для себя свою личную библиотеку" : 
        "Пожалуйста, заполните все поля и загрузите билет для получения доступа к библиотеке"}
      </p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
         {Object.keys(defaultValues).map((field) => (
          <FormField
          key={field}
          control={form.control}
          name={field as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
              <FormControl>
                {
                  field.name === "universityCard" ? (
                    <ImageUpload onFileChange={field.onChange}/>
                  ) : (
                     <Input required type={
                        FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                      } {...field} 
                     className='form-input'/>
                  )
                }
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        ))}
        
        <Button type="submit" className='form-btn'>{isSignIn ? 'Войти' : 'Зарегистрироваться'}</Button>
      </form>
      </Form>
      <p className='text-center text-base font-medium'>
          {isSignIn ? "Впервые на Bookwise? " : "Уже есть аккаунт? "}
          <Link 
          href={isSignIn ? "/sign-up" : "/sign-in"} 
          className='font-bold text-primary'>{isSignIn ? "Зарегистрироваться" : "Войти"}</Link>
      </p>
    </div>
  )
}

export default AuthForm;