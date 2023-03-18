import { FormErrorProps, UserFilesProps } from '@/interface';

export const formatFileSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let formattedSize = size;
  let unitIndex = 0;

  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }

  return `${formattedSize?.toFixed(2)}${units[unitIndex]}`;
};

export const isEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const next_day = (
  createdAt_date: Date,
  number_of_days: number
): Date => {
  const day_in_ms = 24 * 60 * 60 * 1000 * number_of_days;
  const createdAt_in_ms = createdAt_date.getTime();

  const nextDay_date = new Date(createdAt_in_ms + day_in_ms);

  const time_in_ms = createdAt_date.getTime() % day_in_ms;

  const nextDay = new Date(
    nextDay_date.getFullYear(),
    nextDay_date.getMonth(),
    nextDay_date.getDate(),
    0,
    0,
    0,
    time_in_ms
  );

  return nextDay;
};

export const FormValidation = (
  formType: string,
  formData: string,
  formErr: FormErrorProps,
  setFormErr: React.Dispatch<React.SetStateAction<FormErrorProps>>
): boolean => {
  let currentState: boolean = true;

  switch (formType) {
    case 'name':
      try {
        const nameValidation = (formValue: string): boolean => {
          currentState = false;
          if (formValue.trim().length === 0) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Name is required',
            };
            setFormErr(formState);
          } else if (formValue.trim().length <= 2) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Name characters should be more than 2',
            };
            setFormErr(formState);
          } else if (formData.trim().length > 18) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Name characters cannot be more than 18',
            };
            setFormErr(formState);
          } else if (formValue && new RegExp('^[a-zA-Z]$').test(formValue)) {
            const formState = {
              ...formErr,
              state: true,
              msg: "Can't include numbers or special characters eg. '1,23.. or !,@,#,$'",
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return nameValidation(formData);
      } catch (error) {
        console.error(new Error('Something happen in form name'));
      }

    case 'email':
      try {
        const emailValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Email is supposed to be empty',
            };
            setFormErr(formState);
          } else if (!new RegExp(/\S+@\S+\.\S+/).test(formData)) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Make sure your email is in this format: example@comapny.domain',
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return emailValidation(formData);
      } catch (error) {
        console.error(new Error('something went wrong in email'));
      }

    case 'country':
      try {
        const countryValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Select one option from the above',
            };
            setFormErr(formState);
          }
          if (formValue === 'None') {
            const formState = {
              ...formErr,
              state: true,
              msg: 'This field is required',
            };

            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return countryValidation(formData);
      } catch (error) {
        console.error(new Error('Sth went wrong in country'));
      }

    case 'ph_number':
      try {
        const ph_numberValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Phone number required',
            };
            setFormErr(formState);
          } else if (!new RegExp('^(?=.*?[1-9])[0-9()-]+$').test(formValue)) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Incorrect Phone Number format',
            };
            setFormErr(formState);
          } else if (formValue.replace(/[^a-zA-Z0-9 ]/g, '').length < 6) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Phone Number cannot be less 6',
            };
            setFormErr(formState);
          } else if (formData.replace(/[^a-zA-Z0-9 ]/g, '').length > 13) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Phone Number cannot be greater 13',
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return ph_numberValidation(formData);
      } catch (error) {
        console.error(new Error('sth went wrong in ph number'));
      }

    case `${'message' || 'comment'}`:
      try {
        const messageValidation = (formValue: string): boolean => {
          currentState = false;
          if (!formValue) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Message is required',
            };
            setFormErr(formState);
          } else if (formValue.length < 25) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Characters should be more than 25',
            };
            setFormErr(formState);
          } else if (formValue.length > 2000) {
            const formState = {
              ...formErr,
              state: true,
              msg: 'Characters cannot be more than 2000 (290-500 words)',
            };
            setFormErr(formState);
          } else {
            currentState = true;
            const formState = {
              ...formErr,
              state: false,
              msg: '',
            };
            setFormErr(formState);
          }
          return currentState;
        };
        return messageValidation(formData);
      } catch (error) {
        console.error(new Error('sth went wrong in message'));
      }

    case 'password':
      const passwordValidation = (formValue: string): boolean => {
        let currentState = false;

        if (!formValue) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password cannot be empty',
          };

          setFormErr(formState);
        } else if (formValue.length < 8) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password cannot be less then 8 characters',
          };
          setFormErr(formState);
        } else if (formValue.length > 20) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password cannot be more than 20 characters',
          };
          setFormErr(formState);
        } else if (
          !new RegExp('^(?=[^\\d_].*?\\d)\\w(\\w|[!@#$%]){7,20}').test(
            formValue
          )
        ) {
          const formState = {
            ...formErr,
            state: true,
            msg: 'Password must be strong eg: dek@IL32S/._',
          };

          // dek@IL32S/._
          setFormErr(formState);
        } else {
          currentState = true;
          const formState = {
            ...formErr,
            state: false,
            msg: '',
          };
          setFormErr(formState);
        }

        return currentState;
      };
      return passwordValidation(formData);

    default:
      break;
  }

  return currentState;
};

export const StorageCalculation = (files: UserFilesProps[]): string => {
  let totalSize = 0;

  files.forEach((file) => {
    totalSize += file.size;
  });

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;

  if (totalSize >= TB) {
    console.log(`Total size: ${(totalSize / TB).toFixed(2)} TB`);
    return `${(totalSize / TB).toFixed(2)} TB`;
  } else if (totalSize >= GB) {
    console.log(`Total size: ${(totalSize / GB).toFixed(2)} GB`);
    return `${(totalSize / GB).toFixed(2)} GB`;
  } else if (totalSize >= MB) {
    console.log(`Total size: ${(totalSize / MB).toFixed(2)} MB`);
    return `${(totalSize / MB).toFixed(2)} MB`;
  } else if (totalSize >= KB) {
    console.log(`Total size: ${(totalSize / KB).toFixed(2)} KB`);
    return `${(totalSize / KB).toFixed(2)} KB`;
  } else {
    console.log(`Total size: ${totalSize} bytes`);
    return `${totalSize} B`;
  }
};

export const downloadFile = async (url: string, name: string): Promise<void> => {
  try {
    // Fetch the file from the URL
    const response = await fetch(url);
    const data = await response.blob();

    // Create a URL object with the downloaded data
    const blob = new Blob([data], { type: response.headers.get('Content-Type') });
    const blobUrl = URL.createObjectURL(blob);

    // Create a temporary anchor element with the URL and trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = name;
    link.click();

    // Release the URL object and remove the anchor element
    URL.revokeObjectURL(blobUrl);
    link.remove();
  } catch (error) {
    console.error('Failed to download file:', error);
  }
};