import { IRootState } from '@app/store';
import { api } from '@app/common/api/api';
import { IBlackList } from '@app/common/api/response/IBlackList';
import { createCrudSlice } from '@app/common/utils/createCrudSlice';

export const { asyncActions, actions, reducer } = createCrudSlice<IBlackList>({
  name: 'blackList',
  fetchers: {
    read: api.blackList.read,
    update: api.blackList.update,
    create: api.blackList.create,
  },
});

export const selectors = {
  blackListSelector: (state: IRootState) => state.blackList,
};
